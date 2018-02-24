import { View, KeyedTemplate, Property, Template, CoercibleProperty, Length, CssProperty, Style, Color, EventData, booleanConverter } from "ui/core/view";
import { parse, parseMultipleTemplates } from "ui/builder";
import { ListView, ItemsSource, ItemEventData } from "ui/list-view";
import { Observable } from "data/observable";
import { ObservableArray, ChangedData } from "data/observable-array";
import { addWeakEventListener, removeWeakEventListener } from "ui/core/weak-event-listener";

export module knownTemplates {
    export const itemTemplate = "itemTemplate";
}

export module knownMultiTemplates {
    export const itemTemplates = "itemTemplates";
}


export interface ItemEventData extends EventData {
    /**
     * The index of the item, for which the event is raised.
     */
    index: number;

    /**
     * The view that is associated to the item, for which the event is raised.
     */
    view: View;

    /**
     * Gets the native [iOS view](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UITableViewCell_Class/) that represents the user interface where the view is hosted. Valid only when running on iOS.
     */
    ios: any /* UITableViewCell */;

    /**
     * Gets the native [android widget](http://developer.android.com/reference/android/view/ViewGroup.html) that represents the user interface where the view is hosted. Valid only when running on Android OS.
     */
    android: any /* android.view.ViewGroup */;
}

const autoEffectiveRowHeight = -1;
const DEFAULT_TYPE = -1;
export abstract class RecyclerViewBase extends View {
    public static itemLoadingEvent = "itemLoading";
    public static itemLongTapEvent = "itemLongTap";
    public static itemTapEvent = "itemTap";
    public static loadMoreItemsEvent = "loadMoreItems";
    public static knownFunctions = ["itemTemplateSelector"];
    //
    public _defaultTemplate: KeyedTemplate = {
        key: "default",
        createView: () => {
            if (this.itemTemplate) {
                return parse(this.itemTemplate, this);
            }
            return undefined;
        }
    }
    // 
    public _effectiveRowHeight: number = autoEffectiveRowHeight;
    public rowHeight: Length;
    public items: any[] | ItemsSource;
    public itemTemplate: string | Template;
    public itemTemplates: Array<KeyedTemplate>;
    public _itemTemplates: Map<string, KeyedTemplate> = new Map;
    public _itemTemplatesKeys = []; 
    //
    protected _itemTemplateSelector: (item: any, index: number, items: any) => string;
    //
    get separatorColor(): Color {
        return this.style.separatorColor;
    }
    set separatorColor(value: Color) {
        this.style.separatorColor = value;
    }
    get itemTemplateSelector(): ((item: any, index: number, items: any) => string) {
        return this._itemTemplateSelector;
    }
    set itemTemplateSelector(value: ((item: any, index: number, items: any) => string)) {
        this._itemTemplateSelector = value;
    }
    public _onItemsChanged(args: ChangedData<any>) {
        this.refresh();
    }
    public _getDataItem(index: number): any {
        let thisItems = <ItemsSource>this.items;
        return thisItems.getItem ? thisItems.getItem(index) : thisItems[index];
    }
    protected updateEffectiveRowHeight(): void {
        rowHeightProperty.coerce(this);
    }
    public getTemplateIdForItemAt(index: number): number {
        if (this.itemTemplateSelector) {
            let dataItem = this._getDataItem(index);
            let templateKey = this._itemTemplateSelector(dataItem, index, this.items);
            let templateId = this._itemTemplatesKeys.indexOf(templateKey);
            if (templateId > -1) {
                return templateId;
            }
        }
        return DEFAULT_TYPE;
    }
    public getTemplateForTypeId(type: number): KeyedTemplate {
        if (type == DEFAULT_TYPE) {
            return this._defaultTemplate;
        }
        if (this._itemTemplatesKeys[type]) {
            let templateKey = this._itemTemplatesKeys[type];
            if (this._itemTemplates.has(templateKey)) {
                return this._itemTemplates.get(templateKey);
            }
        }
        // This is the default template
        return this._defaultTemplate;
    }
    public _onRowHeightPropertyChanged(oldValue: Length, newValue: Length) {
        this.refresh();
    }
    public abstract scrollToIndex(index: number);
    public abstract refresh();

}

/**
 * Represents the property backing the items property of each ListView instance.
 */
export const itemsProperty = new Property<RecyclerViewBase, any[] | ItemsSource>({
    name: "items", valueChanged: (target, oldValue, newValue) => {
        if (oldValue instanceof Observable) {
            removeWeakEventListener(oldValue, ObservableArray.changeEvent, target._onItemsChanged, target);
        }

        if (newValue instanceof Observable) {
            addWeakEventListener(newValue, ObservableArray.changeEvent, target._onItemsChanged, target);
        }

        target.refresh();
    }
});
itemsProperty.register(RecyclerViewBase);
/**
 * Represents the item template property of each ListView instance.
 */
export const itemTemplateProperty = new Property<RecyclerViewBase, string | Template>({
    name: "itemTemplate", valueChanged: (target) => {
        target.refresh();
    }
});
itemTemplateProperty.register(RecyclerViewBase);
/**
 * Represents the items template property of each ListView instance.
 */
export const itemTemplatesProperty = new Property<RecyclerViewBase, Array<KeyedTemplate>>({
    name: "itemTemplates", valueConverter: (value) => {
        if (typeof value === "string") {
            return parseMultipleTemplates(value);
        }

        return value;
    },
    valueChanged: (target, oldValue, newValue) => {
        target._itemTemplates.clear();
        newValue.forEach(t => {
            target._itemTemplates.set(t.key, t);
        })
        target._itemTemplatesKeys = Array.from(target._itemTemplates.keys());
    }
})
itemTemplatesProperty.register(RecyclerViewBase);


const defaultRowHeight: Length = "auto";
/**
 * Represents the observable property backing the rowHeight property of each ListView instance.
 */
export const rowHeightProperty = new CoercibleProperty<RecyclerViewBase, Length>({
    name: "rowHeight", defaultValue: defaultRowHeight, equalityComparer: Length.equals,
    coerceValue: (target, value) => {
        // We coerce to default value if we don't have display density.
        return target.nativeViewProtected ? value : defaultRowHeight;
    },
    valueChanged: (target, oldValue, newValue) => {
        target._effectiveRowHeight = Length.toDevicePixels(newValue, autoEffectiveRowHeight);
        target._onRowHeightPropertyChanged(oldValue, newValue);
    }, valueConverter: Length.parse
});
rowHeightProperty.register(RecyclerViewBase);

export const separatorColorProperty = new CssProperty<Style, Color>({ name: "separatorColor", cssName: "separator-color", equalityComparer: Color.equals, valueConverter: (v) => new Color(v) });
separatorColorProperty.register(Style);