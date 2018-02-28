import * as common from "./ripple.common";
import { View } from "ui/core/view";
import { DimUtils, Bounds } from "nativescript-nbmaterial-commons";
import { Color } from "color";
import { RippleOption } from "./ripple"
import {
    TouchGestureEventData,
    GestureTypes
} from "ui/gestures";
export { RippleLayout } from "./ripple.common";

function MDCRipple(self: View, opts: RippleOption, resolve, reject) {
    const wrapper: View = opts.wrapper ? opts.wrapper : self;
    const native: UIView = wrapper.nativeView;
    let ripple = MDCInkView.new().initWithFrame(native.bounds);
    ripple.inkColor = self.rippleColor ? self.rippleColor.ios : new Color("#000000").ios;
    ripple.alpha = self.rippleAlpha || 0.22;
    ripple.userInteractionEnabled = false;
    ripple.backgroundColor = UIColor.clearColor;
    ripple.autoresizingMask = UIViewAutoresizing.FlexibleHeight | UIViewAutoresizing.FlexibleWidth;
    //BOUND TO VIEW
    ripple.layer.masksToBounds = true;
    ripple.layer.bounds = CGRectMake(native.bounds.origin.x, native.bounds.origin.y, native.bounds.size.width, native.bounds.size.height);
    ripple.layer.position = CGPointMake(native.bounds.size.width / 2, native.bounds.size.height / 2);
    // 
    native.addSubview(ripple);
    //
    let left = native.bounds.origin.x;
    let top = native.bounds.origin.y;
    const bounds: Bounds = DimUtils.bounds(top, left, native.bounds.size.width, native.bounds.size.height);
    const centerBounds = DimUtils.centerOf(bounds);
    let x = centerBounds.left;
    let y = centerBounds.top;
    //
    const center = CGPointMake(x || 0, y || 0);
    ripple.startTouchBeganAnimationAtPointCompletion(center, () => {
    });
    ripple.startTouchEndedAnimationAtPointCompletion(center, () => {
        ripple.removeFromSuperview();
        resolve();
    });
}
function MyRipple(self: View, opts: RippleOption, resolve, reject) {
    const wrapper: View = opts.wrapper ? opts.wrapper : self;
    const native: UIView = wrapper.nativeView;
    // 
    const size = native.bounds.size;
    const width = Math.max(size.height, size.width) * (opts.iosRadiusFactor || 1);
    const radius = Math.floor(width / 2);
    const rippleWrapper = UIView.alloc().initWithFrame(native.frame);
    const ripple = UIView.alloc().initWithFrame(
        CGRectMake(0, 0, radius, radius)
    );
    rippleWrapper.addSubview(ripple);
    rippleWrapper.clipsToBounds = true;
    ripple.layer.cornerRadius = radius * 0.5;
    ripple.backgroundColor = native.backgroundColor ? native.backgroundColor : new Color("#000000").ios;
    ripple.alpha = 1;
    //
    let left = native.bounds.origin.x;
    let top = native.bounds.origin.y;
    const bounds: Bounds = DimUtils.bounds(top, left, native.bounds.size.width, native.bounds.size.height);
    const centerBounds = DimUtils.centerOf(bounds);
    let x = centerBounds.left;
    let y = centerBounds.top;
    //BOUNDS
    rippleWrapper.center = CGPointMake(x || 0, y || 0);
    ripple.center = CGPointMake(x || 0, y || 0);
    //SCALE INIT
    ripple.transform = CGAffineTransformMakeScale(0.1, 0.1);
    //
    native.insertSubviewAtIndex(rippleWrapper, 0);

    UIView.animateWithDurationDelayOptionsAnimationsCompletion(
        self.rippleDuration || 0.4,
        0,
        UIViewAnimationOptions.CurveEaseOut,
        () => {
            ripple.transform = CGAffineTransformMakeScale(2.5, 2.5);
            ripple.alpha = self.rippleAlpha || 0.22;
            ripple.backgroundColor = self.rippleColor ? self.rippleColor.ios : new Color("#cecece").ios;
        },
        (finished: boolean) => {
            rippleWrapper.removeFromSuperview();
            resolve();
        }
    );
}
View.prototype.startRippleNative = function (opts): Promise<any> {
    const self: View = this;
    return new Promise((resolve, reject) => {
        //MDCRipple(self, opts, resolve, reject);
        MyRipple(self, opts, resolve, reject);
    });
}
