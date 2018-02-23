import { NavigationEntry } from 'tns-core-modules/ui/frame';
import { Color, View, CustomLayoutView, EventData } from 'tns-core-modules/ui/core/view';
import { AbsoluteLayout } from 'tns-core-modules/ui/layouts/absolute-layout';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { Frame, NavigationEntry } from 'tns-core-modules/ui/frame';
import { Label } from 'tns-core-modules/ui/label';

export interface BottomNavigationRouter {
    route(index: number): NavigationEntry;
}
export declare class BottomNavigationFrame extends GridLayout {
    router: BottomNavigationRouter;
    navigate(entry: NavigationEntry);
}
export declare class BottomNavigation extends GridLayout {
    public static selectEvent: string;
    items: BottomNavigationItem[];
    selectedIndex: number;
    rippleColor: Color;
    unchecked: number;
    shifted: boolean;
    activems: number;
    inactivems: number;
    maxfont: number;
    autoselect: boolean;
    refresh();
    prepareLayout();
    resetLayout();
    isActive(item: BottomNavigationItem);
    setSelected(item: BottomNavigationItem);
    on(eventNames: string, callback: (args: EventData) => void, thisArg?: any);
    on(event: "select", callback: (args: SelectItemEventData) => void, thisArg?: any);
}
export interface SelectItemEventData extends EventData {
    index: number;
    nextEntry?: NavigationEntry;
}
export declare class BottomNavigationItem extends GridLayout {
    public static afterTapEvent: string;
    tab: BottomNavigation;
    isAnimated(): boolean;
    isActive(): boolean;
    activate(): void;
    unactivate(): void;
}
export declare class Icon extends Label {
}
export declare class Title extends Label {
}

declare module "tns-core-modules/ui/page" {
    interface Page {
        menuRootIndex: number;
    }
}