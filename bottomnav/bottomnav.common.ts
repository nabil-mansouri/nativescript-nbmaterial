import { booleanConverter, Property, Style, CssProperty, isIOS, Color, View, isAndroid, EventData } from 'tns-core-modules/ui/core/view';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { AbsoluteLayout } from 'tns-core-modules/ui/layouts/absolute-layout';
import { GridLayout, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout';
import { Label } from 'tns-core-modules/ui/label';
import { Frame, NavigationEntry, topmost, OnNavigateToEventData } from 'tns-core-modules/ui/frame';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import { GestureTypes } from 'tns-core-modules/ui/gestures';
import { SelectItemEventData, BottomNavigationRouter, BottomNavigationFrame as BottomNavigationFrameDef, BottomNavigation as BottomNavigationDef, BottomNavigationItem as BottomNavigationItemDef } from "./bottomnav";
import "nativescript-nbmaterial-elevation/elevation";//NEED TO aUGMENT VIEW
import "nativescript-nbmaterial-ripple/ripple";//NEED TO aUGMENT VIEW
import "nativescript-nbmaterial-layouts/layouts";//NEED TO aUGMENT VIEW

export class BottomNavigationFrame extends GridLayout implements BottomNavigationFrameDef {
    protected navFrame: Frame;
    router: BottomNavigationRouter;
    constructor() {
        super();
        this.addColumn(new ItemSpec(1, "star"));
        this.addRow(new ItemSpec(1, "star"));
        this.addRow(new ItemSpec(1, "auto"));
        //
        this.navFrame = new Frame();
        this.navFrame.row = 0;
        this.addChild(this.navFrame);
        //
        this.backgroundColor = "transparent";
    }
    navigate(entry: NavigationEntry) {
        this.navFrame.navigate(entry);
    }
    _addChildFromBuilder(name: string, value: any) {
        super["_addChildFromBuilder"](name, value);
        if (value instanceof BottomNavigation) {
            value.row = 1;
            value.on(BottomNavigation.selectEvent, () => {
                if (this.router) {
                    let route = this.router.route(value.selectedIndex);
                    if (route) {
                        this.navigate(route);
                    }
                }
            });
        }
    }
}

export class BottomNavigation extends GridLayout implements BottomNavigationDef {
    public static selectEvent: string = "select";
    items: BottomNavigationItem[] = [];
    selectedItem: BottomNavigationItem;
    get rippleColor(): Color { return this.style.rippleColor; }
    set rippleColor(c) { this.style.rippleColor = c; }
    unchecked: number;
    shifted: boolean;
    shiftedwidth: number;
    activems: number;
    inactivems: number;
    maxfont: number;
    autoselect: boolean;
    protected callbackFrame = null;
    // 
    get selectedIndex() {
        return this.items.indexOf(this.selectedItem);
    }
    set selectedIndex(index: number) {
        this.setSelected(this.items[index]);
    }
    disposeNativeView() {
        super.disposeNativeView();
        this.items = [];
        this.selectedItem = null;
    }
    isActive(item: BottomNavigationItemDef) {
        return this.selectedItem === item;
    }
    initNativeView() {
        this.shifted = this.cssClasses.has("shifted") || this.shifted;
        this.setCssClass();
        super.initNativeView();
        this.prepareLayout();
        //WHEN GO BACK => UPDATE MENU POSITION
        this.callbackFrame = (arg: OnNavigateToEventData) => {
            if (arg.isBack) {
                let index = arg.nextPage.menuRootIndex || 0;
                this.setSelected(this.items[index], false);
            }
        }
    }
    onLoaded() {
        super.onLoaded();
        if (this.autoselect) {
            //WAIT NAVIGATION QUEUE FINISHED(FRAME)
            this.onFirstLayout(() => {
                this.setSelected(this.items[0], false);
            })
        }
        Frame.onEveryNavigate(this.callbackFrame);
    }
    onUnloaded() {
        super.onUnloaded();
        Frame.offEveryNavigate(this.callbackFrame);
    }
    setCssClass() {
        if (this.shifted) {
            this.cssClasses.add("shifted");
            this.cssClasses.delete("fixed");
        } else {
            this.cssClasses.delete("shifted");
            this.cssClasses.add("fixed");
        }
    }
    refresh() {
        this.setCssClass();
        this.resetLayout();
        this.prepareLayout();
        this.onNextLayout(() => {
            this.shifted ? DefaultAnimation.shifted(this, this.selectedItem, null) : DefaultAnimation.fixed(this, this.selectedItem, null);
        })
    }
    prepareLayout() {
        let i = 0;
        this.items = [];
        this.removeColumns();
        this.eachLayoutChild((view: View) => {
            if (view instanceof BottomNavigationItem) {
                this.addColumn(new ItemSpec(1, this.shifted ? "auto" : "star"));
                view.col = i++;
                this.items.push(view);
            }
        });
    }
    resetLayout() {
        this.eachLayoutChild((view: View) => {
            if (view instanceof BottomNavigationItem) {
                view.translateX = 0;
                view.translateY = 0;
            }
            return true;
        });
    }
    setSelected(item: BottomNavigationItem, emit = true) {
        if (this.selectedItem != item) {
            let oldIndex = this.selectedIndex;
            if (item) {
                this.shifted ? DefaultAnimation.shifted(this, item, this.selectedItem) : DefaultAnimation.fixed(this, item, this.selectedItem);
            } else {
                this.resetLayout();
            }
            this.selectedItem = item;
            if (emit) {
                let obj: SelectItemEventData = {
                    eventName: BottomNavigation.selectEvent, object: this,
                    index: this.selectedIndex
                }
                this.notify(obj);
                if (obj.nextEntry) {
                    let frame = topmost();
                    frame.currentPage.menuRootIndex = oldIndex;
                    frame.navigate(obj.nextEntry);
                }
            }
        }
    }
}
BottomNavigation.prototype["recycleNativeView"] = false;

export interface BottomNavigation {
    on(eventNames: string, callback: (args: EventData) => void, thisArg?: any);
    on(event: "select", callback: (args: SelectItemEventData) => void, thisArg?: any);
}

export abstract class BottomNavigationItem extends GridLayout implements BottomNavigationItemDef {
    public static afterTapEvent: string = "afterTap";
    animated: boolean = false;
    initialFont: number;
    tapCallback;
    constructor() {
        super();
    }
    get tab(): BottomNavigationDef {
        return <BottomNavigationDef>this.parent;
    }
    isActive() {
        return this.tab.isActive(this);
    }
    initNativeView() {
        let icon = this.iconView;
        icon.textWrap = true;
        if (this.getChildrenCount() == 2) {
            let title = this.titleView;
            title.textWrap = true;
        };
        super.initNativeView();
    }
    createNativeView() {
        this.tapCallback = (data) => {
            this.startRippleNative({ wrapper: this.tab }).then(() => {
                this.activate();
                this.notify({ eventName: BottomNavigationItem.afterTapEvent, object: this });
            });
        };
        this.on(GestureTypes.tap, this.tapCallback);
        return super.createNativeView();
    }
    disposeNativeView() {
        this.off(GestureTypes.tap, this.tapCallback);
        super.disposeNativeView();
    }
    isAnimated(): boolean {
        return this.animated;
    }
    activate(): void {
        this.tab.setSelected(this);
    }
    unactivate(): void {
        this.tab.setSelected(null);
    }
    get iconView(): Label { return <Label>this.getChildAt(0); }
    get titleView(): Label { return this.hasTitle ? <Label>this.getChildAt(1) : null; }
    get hasTitle() { return this.getChildrenCount() == 2; }

}
BottomNavigationItem.prototype["recycleNativeView"] = false;

class DefaultAnimation {
    static fixed(tab: BottomNavigationDef, newItem: BottomNavigationItemDef, oldItem: BottomNavigationItemDef) {
        newItem && DefaultAnimation.fixedActive(<BottomNavigationItem>newItem);
        oldItem && DefaultAnimation.fixedInactive(<BottomNavigationItem>oldItem);
    }
    static fixedActive(item: BottomNavigationItem) {
        let promises = [];
        const duration = item.tab.activems;
        const curve = AnimationCurve.easeInOut;
        promises.push(item.iconView.animate({ translate: { x: 0, y: -2 }, opacity: 1, duration, curve }))
        //DO NO TRANSLATE TITLE -2
        if (item.hasTitle) {
            const ratio = item.tab.maxfont / item.titleView.fontSize;
            promises.push(item.titleView.animate({ translate: { x: 0, y: 0 }, opacity: 1, scale: { x: ratio, y: ratio }, duration, curve }))
        }
        return promises;
    }
    static fixedInactive(item: BottomNavigationItem) {
        let promises = [];
        const opacity = item.tab.unchecked;
        const duration = item.tab.inactivems;
        const curve = AnimationCurve.easeInOut;
        promises.push(item.iconView.animate({ translate: { x: 0, y: 0 }, opacity, duration, curve }))
        if (item.hasTitle) {
            promises.push(item.titleView.animate({ translate: { x: 0, y: 0 }, opacity, scale: { x: 1, y: 1 }, duration, curve }))
        }
        return promises;
    }
    static shifted(tab: BottomNavigation, newItem: BottomNavigationItem, oldItem: BottomNavigationItem) {
        if (newItem) {
            let promises = [];
            const duration = tab.activems;
            const curve = AnimationCurve.easeInOut;
            const tabWidth = tab.getActualSize().width;
            let tabItemWidth = 0;
            tab.items.forEach(item => {
                tabItemWidth += typeof item.minWidth == "number" ? item.minWidth : 56;
            })
            let diffWidth = tabWidth - tabItemWidth;
            //TRANSLATE 
            let translateX = 0;
            tab.items.forEach((item, index) => {
                const width = item.getActualSize().width;
                //BEFORE 
                if (item == newItem) {
                    translateX += ((width + diffWidth) / 2);
                    translateX -= (width / 2);
                }
                //TRANSLATE
                promises.push(item.animate({ translate: { x: translateX, y: 0 }, duration, curve }))
                //AFTER
                if (item == newItem) {
                    translateX += ((width + diffWidth) / 2);
                    translateX -= (width / 2);
                }
            })
            //
            if (oldItem) {
                oldItem.width = <any>oldItem.minWidth
                promises.push(DefaultAnimation.shiftInactive(oldItem));
            }
            newItem.width = "auto";
            promises.push(DefaultAnimation.shiftActive(newItem));
        }
    }
    static shiftActive(item: BottomNavigationItem) {
        let promises = [];
        let duration = item.tab.activems;
        let curve = AnimationCurve.easeInOut;
        promises.push(item.iconView.animate({ translate: { x: 0, y: -10 }, opacity: 1, duration, curve }))
        if (item.hasTitle) {
            duration = duration / 1.5;//UP TO 2 LIKE FIXED
            promises.push(item.titleView.animate({ translate: { x: 0, y: 0 }, scale: { x: 1, y: 1 }, opacity: 1, duration, curve }))
        }
        return promises;
    }
    static shiftInactive(item: BottomNavigationItem) {
        let promises = [];
        let duration = item.tab.inactivems;
        let curve = AnimationCurve.easeInOut;
        const opacity = item.tab.unchecked;
        promises.push(item.iconView.animate({ translate: { x: 0, y: 0 }, opacity, duration, curve }))
        if (item.hasTitle) {
            duration = duration / 3;
            promises.push(item.titleView.animate({ translate: { x: 0, y: 0 }, opacity: 0, scale: { x: 0, y: 0 }, duration, curve }))
        }
        Promise.all(promises).then(all => {
            item.width = item.minWidth;
        });
        return promises;
    }
}

export class Icon extends Label {

}
export class Title extends Label {

}

export const itemsProperty = new Property<BottomNavigation, BottomNavigationItemDef>({
    affectsLayout: isIOS,
    name: "items"
});
itemsProperty.register(BottomNavigation);

export const opacityUncheckedProperty = new Property<BottomNavigation, number>({
    name: "unchecked",
    affectsLayout: isIOS,
    valueConverter: (v) => parseFloat(v)
});
opacityUncheckedProperty.register(BottomNavigation);

export const shiftModeProperty = new Property<BottomNavigation, boolean>({
    name: "shifted",
    affectsLayout: isIOS,
    valueConverter: booleanConverter
});
shiftModeProperty.register(BottomNavigation);

export const activeDurationProperty = new Property<BottomNavigation, number>({
    name: "activems",
    affectsLayout: isIOS,
    valueConverter: (v) => parseFloat(v)
});
activeDurationProperty.register(BottomNavigation);

export const inactiveDurationProperty = new Property<BottomNavigation, number>({
    name: "inactivems",
    affectsLayout: isIOS,
    valueConverter: (v) => parseFloat(v)
});
inactiveDurationProperty.register(BottomNavigation);

export const maxTitleSizeProperty = new Property<BottomNavigation, number>({
    name: "maxfont",
    affectsLayout: isIOS,
    valueConverter: (v) => parseInt(v)
});
maxTitleSizeProperty.register(BottomNavigation);

export const selectFirstProperty = new Property<BottomNavigation, boolean>({
    name: "autoselect",
    affectsLayout: isIOS,
    valueConverter: booleanConverter
});
selectFirstProperty.register(BottomNavigation);
