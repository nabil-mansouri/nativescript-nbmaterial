import { View, Property } from 'tns-core-modules/ui/core/view';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { Label } from "tns-core-modules/ui/label";
import { Color } from "tns-core-modules/color";
import { CssProperty } from "tns-core-modules/ui/core/properties";
import { Style } from "tns-core-modules/ui/core/properties";

export declare class AppBarLayout extends Layout {
    statusBarStyle: "light" | "dark";
    statusBarFixed:boolean;
}
export declare class AppBarStatus extends Label {
}
export declare class AppBarTitle extends Label {
}
export declare class AppBarIcon extends Label {
    action: "back" | "forward";
} 