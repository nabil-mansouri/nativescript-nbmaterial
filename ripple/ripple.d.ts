import { CssProperty, Style, Color } from "ui/core/view";
import { AbsoluteLayout } from "ui/layouts/absolute-layout";
import { Point } from "nativescript-nbmaterial-commons";

export declare const rippleColorProperty: CssProperty<Style, Color>;
export declare const rippleAlphaProperty: CssProperty<Style, number>;
export declare const rippleDurationProperty: CssProperty<Style, number>;
export declare const fadeDurationProperty: CssProperty<Style, number>;

declare interface RippleOption {
    wrapper?: View;
    iosRadiusFactor?: number;
    androidHotBounds?: boolean;
}
declare module "tns-core-modules/ui/styling/style" {
    interface Style {
        rippleColor: Color;
        rippleAlpha: number;
        rippleDuration: number;
        fadeDuration: number;
    }
}
declare module "tns-core-modules/ui/core/view" {
    interface View {
        rippleColor: Color;
        rippleAlpha: number;
        rippleDuration: number;
        fadeDuration: number;
        startRippleNative(opts: RippleOption): Promise<any>;
    }
}

export declare class RippleLayout extends AbsoluteLayout {
    perfomRipple(): Promise<any>;
}