import { View, Property, InheritedCssProperty, isIOS, widthProperty, booleanConverter } from 'tns-core-modules/ui/core/view';
import { Color } from "tns-core-modules/color";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout";
import { Button } from "tns-core-modules/ui/button";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { CssProperty, Style } from "tns-core-modules/ui/core/properties";
import { FloatButton as FloatButtonBaseDef } from "./buttons";
import { GestureTypes } from 'tns-core-modules/ui/gestures'; 
import "nativescript-nbmaterial-elevation";//NEED TO aUGMENT VIEW
import "nativescript-nbmaterial-ripple";//NEED TO aUGMENT VIEW


export abstract class FloatButtonBase extends Button implements FloatButtonBaseDef {
    static afterTapEvent: string = "afterTap";
    animNavigation: boolean;
    get rippleColor(): Color { return this.style.rippleColor; }
    set rippleColor(c) { this.style.rippleColor = c; }
    tapCallback: (ev) => void; 
    initNativeView() {
        //MUST BE AFTER ELEVATION
        this.textWrap = true;
        super.initNativeView();
        this.tapCallback = (data) => {
            this.startRippleNative({ wrapper: this }).then(() => {
                this.notify({ eventName: FloatButtonBase.afterTapEvent, object: this });
            });
        };
        this.on(Button.tapEvent, this.tapCallback);
    }
    onLoaded() {
        super.onLoaded();
        if (this.animNavigation) {
            this.scaleX = 0.01;
            this.scaleY = 0.01;
            this.animate({ scale: { x: 1, y: 1 }, curve: AnimationCurve.easeInOut, delay: 300, duration: 250 })
        }
    }
    onUnloaded() {
        super.onUnloaded();
        if (this.animNavigation) {
            this.animate({ scale: { x: 0.01, y: 0.01 }, curve: AnimationCurve.easeInOut, duration: 150 })
        }
    }
    disposeNativeView() {
        super.disposeNativeView();
        this.off(Button.tapEvent, this.tapCallback);
    }
}
FloatButtonBase.prototype["recycleNativeView"] = false;

export const animNavigationProperty = new Property<FloatButtonBase, boolean>({
    name: "animNavigation",
    affectsLayout: isIOS,
    valueConverter: booleanConverter
});
animNavigationProperty.register(FloatButtonBase);