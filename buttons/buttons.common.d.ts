import { Property } from 'tns-core-modules/ui/core/view';
import { Color } from "tns-core-modules/color"; 
import { Button } from "tns-core-modules/ui/button";
import { FloatButton as FloatButtonBaseDef } from "./buttons";
export declare abstract class FloatButtonBase extends Button implements FloatButtonBaseDef {
    static afterTapEvent: string;
    animNavigation: boolean;
    rippleColor: Color;
    tapCallback: (ev) => void;
    protected initStyle(): void;
    elevation: number; 
    initNativeView(): void;
    onLoaded(): void;
    onUnloaded(): void;
    disposeNativeView(): void;
}
export declare const ripleColorProperty: Property<FloatButtonBase, Color>;
export declare const animNavigationProperty: Property<FloatButtonBase, boolean>;
