import * as common from "./ripple.common";
import { layout } from "utils/utils";
import { View } from "ui/core/view";
import { Color } from "tns-core-modules/color";
import {
    fadeDurationProperty,
    rippleAlphaProperty,
    rippleColorProperty,
    rippleDurationProperty
} from "./ripple.common";

export { RippleLayout } from "./ripple.common";
import { DimUtils, Bounds } from "nativescript-nbmaterial-commons";

function arrayInt(model: any[]) {
    let array = Array["create"]("int", model.length);
    for (let i = 0; i < model.length; i++) {
        array[i] = model[i];
    }
    return array;
}
function fill(array: any[], val) {
    for (let i = 0; i < array.length; i++) {
        array[i] = val;
    }
}
function getAdaptiveRippleDrawable(radius: number, rippleColor: Color, normalColor: Color, old: android.graphics.drawable.Drawable) {
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
        return new android.graphics.drawable.RippleDrawable(android.content.res.ColorStateList.valueOf(rippleColor.android),
            old, old);
    } else {
        return getStateListDrawable(rippleColor, normalColor);
    }
}
function getRippleMask(radius: number, normalColor: Color) {
    let outerRadii = Array["create"]("float", 8);
    fill(outerRadii, radius);
    let r = new android.graphics.drawable.shapes.RoundRectShape(outerRadii, null, null);
    let shapeDrawable = new android.graphics.drawable.ShapeDrawable(r);
    shapeDrawable.getPaint().setColor(normalColor.android);
    return shapeDrawable;
}

function getStateListDrawable(rippleColor: Color, normalColor: Color) {
    let states = new android.graphics.drawable.StateListDrawable();
    states.addState(arrayInt([android.R.attr.state_pressed]),
        new android.graphics.drawable.ColorDrawable(rippleColor.android));
    states.addState(arrayInt([android.R.attr.state_focused]),
        new android.graphics.drawable.ColorDrawable(rippleColor.android));
    states.addState(arrayInt([android.R.attr.state_activated]),
        new android.graphics.drawable.ColorDrawable(rippleColor.android));
    states.addState(arrayInt([]),
        new android.graphics.drawable.ColorDrawable(normalColor.android));
    return states;
}
function getBounds(self: View): { left: number, top: number, right: number, bottom: number } {
    const currentNative: android.view.View = self.nativeView;
    let left = currentNative.getLeft();
    let top = currentNative.getTop();
    let right = currentNative.getRight();
    let bottom = currentNative.getBottom();
    if (self.translateX) {
        const trans = layout.toDevicePixels(self.translateX);
        left += trans;
        right += trans;
    }
    if (self.translateY) {
        const trans = layout.toDevicePixels(self.translateY);
        top += trans;
        bottom += trans;
    }
    return { left, top, right, bottom };
}
View.prototype.startRippleNative = function (opts): Promise<any> {
    const self: View = this;
    return new Promise((resolve, reject) => {
        const wrapper: View = opts.wrapper ? opts.wrapper : self;
        const wrapperNative: android.view.View = wrapper.nativeView;
        const size = self.getActualSize();
        const width = Math.max(size.height, size.width);
        let radius = layout.toDevicePixels(width) * 0.5;
        const rippleColor = self.rippleColor ? self.rippleColor : new Color("#cecece");
        const backgroundColor = self.backgroundColor instanceof Color ? self.backgroundColor : new Color("#000000");
        const oldDrawable = wrapperNative.getBackground();
        const alpha = self.rippleAlpha || 0.22;
        const duration = self.rippleDuration || 200;
        const bounds: Bounds = DimUtils.toBounds(this, <any>this.parent);
        const center = DimUtils.centerOf(bounds);
        //ripple.setAlpha(alpha * 255);
        let statesOn = Array["create"]("int", 2);
        statesOn[0] = android.R.attr.state_enabled;
        statesOn[1] = android.R.attr.state_pressed;
        let statesOff = Array["create"]("int", 0);
        //
        let ripple = wrapperNative.getBackground();
        let isnew = false;
        if (!(ripple instanceof android.graphics.drawable.RippleDrawable)) {
            ripple = getAdaptiveRippleDrawable(radius, rippleColor, backgroundColor, oldDrawable);
            isnew = true;
        }
        let { left, top, bottom, right } = getBounds(self);
        if (opts.androidHotBounds) {
            ripple.setHotspotBounds(left, top, right, bottom);
        } else {
            let rect = new android.graphics.Rect();
            rect.set(left, top, right, bottom);
            ripple.setHotspot(rect.exactCenterX(), rect.exactCenterY());
        }
        if (isnew) {
            wrapperNative.setBackground(ripple);
        }
        ripple.setState(statesOn);
        setTimeout(() => {
            ripple.setState(statesOff);
            resolve();
        }, duration)
    });
}