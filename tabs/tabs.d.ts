import { View, Property } from 'tns-core-modules/ui/core/view';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { Label } from "tns-core-modules/ui/label";
import { Color } from "tns-core-modules/color";
import { CssProperty } from "tns-core-modules/ui/core/properties";
import { Style } from "tns-core-modules/ui/core/properties";

export declare class Tabs extends Layout {
    public static selectEvent: string;
    items: TabItem[];
    selectedIndex: number;
    rippleColor: Color;
    barColor: Color;
    unchecked: number;
    activems: number;
    inactivems: number;
    autoselect: boolean;
    scrollable: boolean;
    isActive(item: TabItem);
    setSelected(item: TabItem);
}
export declare class TabItem extends AbsoluteLayout {
    public static tapEvent: string;
    tab: Tabs;
    isActive(): boolean;
    activate(): void;
    unactivate(): void;
}
export declare class TabTitle extends Label {
}
export declare class TabIcon extends Label {
} 
export declare class TabSep extends View {
} 