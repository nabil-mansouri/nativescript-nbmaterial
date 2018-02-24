import { View, Property } from 'tns-core-modules/ui/core/view';
import { LayoutBase } from "tns-core-modules/ui/layouts/layout-base";
import { Color } from "tns-core-modules/color";
import { CssProperty } from "tns-core-modules/ui/core/properties";
import { Style } from "tns-core-modules/ui/core/properties";

export declare abstract class FloatButton extends View {
    static aftertapEvent: string;
    animNavigation: boolean;
    rippleColor: Color;
}
