import { booleanConverter, Property, Style, CssProperty, isIOS, Color, View, layout } from 'tns-core-modules/ui/core/view';
import { GridLayout, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout';
import { AbsoluteLayout } from 'tns-core-modules/ui/layouts/absolute-layout';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { Label } from 'tns-core-modules/ui/label';
import { topmost } from 'tns-core-modules/ui/frame';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import { GestureTypes } from 'tns-core-modules/ui/gestures';
import { Tabs as TabsDef, TabItem as TabItemDef, TabTitle as TabTitleDef, TabIcon as TabIconDef, TabSep as TabSepDef } from "./tabs";
import "nativescript-nbmaterial-elevation";//NEED TO aUGMENT VIEW
import "nativescript-nbmaterial-ripple";//NEED TO aUGMENT VIEW

export class Tabs extends ScrollView implements TabsDef {
    public static selectEvent: string = "select";
    barColor: Color;
    activems: number;
    unchecked: number;
    inactivems: number;
    items: TabItemDef[] = [];
    autoselect: boolean;
    scrollable: boolean;
    selectedItem: TabItemDef;
    constructor() {
        super();
        this.content = new GridLayout;
        this.orientation = "horizontal";
        this.scrollBarIndicatorVisible = false;
    }
    createNativeView() {
        return super.createNativeView();
    }
    get layoutManager(): GridLayout {
        return <any>this.content;
    }
    get selectedIndex() {
        return this.items.indexOf(this.selectedItem);
    }
    set selectedIndex(index: number) {
        this.setSelected(this.items[index]);
    }
    _addChildFromBuilder(name, view) {
        this.layoutManager.addChild(view);
    }
    disposeNativeView() {
        super.disposeNativeView();
        this.items = [];
        this.selectedItem = null;
    }
    isActive(item: TabItemDef) {
        return this.selectedItem === item;
    }
    initNativeView() {
        super.initNativeView();
        this.prepareLayout();
    }
    prepareLayout() {
        let i = 0;
        this.items = [];
        this.layoutManager.eachLayoutChild((view: View) => {
            if (view instanceof TabItem) {
                this.layoutManager.addColumn(new ItemSpec(0, "auto"));
                view.col = i++;
                this.items.push(view);
            } else if (view instanceof TabSep) {
                view.col = 0;
            }
        });
    }
    setSelected(item: TabItemDef) {
        const old = this.selectedItem;
        const oldIndex = this.selectedIndex;
        this.selectedItem = item;
        const newIndex = this.selectedIndex;
        TabAnimation.moveSep(this, <TabItem>old);
        this.notify({ eventName: Tabs.selectEvent, object: this, index: newIndex, forward: (oldIndex < newIndex) });
    }
}
Tabs.prototype["recycleNativeView"] = false;


export class TabItem extends AbsoluteLayout implements TabItemDef {
    public static tapEvent: string = "tap";
    tapCallback;
    get tab(): Tabs {
        return <Tabs>this.parent.parent;
    }
    isActive() {
        return this.tab.isActive(this);
    }
    initNativeView() {
        super.initNativeView();
        const tab = this.tab;
        if (this.col == 0 && tab.autoselect) {
            this.setOpacity(1);
            tab.selectedItem = this;
        } else {
            this.setOpacity(tab.unchecked);
        }
    }
    setOpacity(o) {
        this.eachLayoutChild(view => {
            view.opacity = o;
        })
    }
    createNativeView() {
        this.tapCallback = (data) => {
            //speedAnimation: 2 
            this.startRippleNative({ wrapper: this }).then(() => {
                if (this.tab.selectedItem !== this) {
                    this.notify({ eventName: TabItem.tapEvent, object: this });
                    this.activate();
                }
            });

        };
        this.on(GestureTypes.tap, this.tapCallback);
        return super.createNativeView();
    }
    disposeNativeView() {
        this.off(GestureTypes.tap, this.tapCallback);
        super.disposeNativeView();
    }
    activate(): void {
        this.tab.setSelected(this);
    }
    unactivate(): void {
        this.tab.setSelected(null);
    }
}
TabItem.prototype["recycleNativeView"] = false;


export class TabTitle extends Label implements TabTitleDef {
    onLoaded() {
        //BUG FIX=>float(undefined)
        if (typeof this.opacity == "undefined") {
            this.opacity = 1;
        }
        super.onLoaded();
    }
}
export class TabIcon extends Label implements TabIconDef {
}
export class TabSep extends Label implements TabSepDef {
    originalWidth = null;
}

class TabAnimation {
    static moveSep(tabs: Tabs, old: TabItem) {
        if (old) {
            old.setOpacity(tabs.unchecked);
        }
        tabs.layoutManager.eachLayoutChild(child => {
            if (child instanceof TabSep) {
                let item = <TabItem>tabs.selectedItem;
                if (item) {
                    let pos = item.getLocationRelativeTo(tabs);
                    let futurWidth = item.getActualSize().width;
                    item.setOpacity(1);
                    if (!child.originalWidth) {
                        child.originalWidth = child.getActualSize().width;
                    }
                    let scale = futurWidth / child.originalWidth;
                    let diff = futurWidth - child.originalWidth;
                    let translateX = pos.x + (diff / 2) + tabs.horizontalOffset;
                    child.animate({ translate: { x: translateX, y: 0 }, scale: { x: scale, y: 1 }, duration: tabs.activems, curve: AnimationCurve.easeInOut });
                }
            }
        })
    }
}


export const opacityUncheckedProperty = new Property<Tabs, number>({
    name: "unchecked",
    affectsLayout: isIOS,
    valueConverter: (v) => parseFloat(v)
});
opacityUncheckedProperty.register(Tabs);


export const activeDurationProperty = new Property<Tabs, number>({
    name: "activems",
    affectsLayout: isIOS,
    valueConverter: (v) => parseFloat(v)
});
activeDurationProperty.register(Tabs);


export const selectFirstProperty = new Property<Tabs, boolean>({
    name: "autoselect",
    affectsLayout: isIOS,
    valueConverter: booleanConverter
});
selectFirstProperty.register(Tabs);