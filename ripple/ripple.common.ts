import { Property } from "ui/core/properties";
import { ContentView } from "ui/content-view";
import { AnimationCurve } from "ui/enums";
import { View, Style, CssProperty } from "ui/core/view";
import { Label } from "ui/label";
import { Color } from "color";
import { LayoutBase } from "ui/layouts/layout-base";
import { AbsoluteLayout } from "ui/layouts/absolute-layout";
import {
    TouchGestureEventData,
    GestureTypes
} from "ui/gestures";
import { RippleOption } from "./ripple"
import { DimUtils, Bounds } from "nativescript-nbmaterial-commons"


export const rippleColorProperty = new CssProperty<Style, Color>({
    name: "rippleColor",
    cssName: "ripple-color",
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
rippleColorProperty.register(Style);

export const rippleAlphaProperty = new CssProperty<Style, number>({
    name: "rippleAlpha",
    cssName: "ripple-alpha"
});
rippleAlphaProperty.register(Style);

export const rippleDurationProperty = new CssProperty<Style, number>({
    name: "rippleDuration",
    cssName: "ripple-duration"
});
rippleDurationProperty.register(Style);

export const fadeDurationProperty = new CssProperty<Style, number>({
    name: "fadeDuration",
    cssName: "fade-duration"
});
fadeDurationProperty.register(Style);

function defineCss(name: string) {
    Object.defineProperty(View.prototype, name, {
        get: function () { return this.style[name]; },
        set: function (el) {
            this.style[name] = el;
        },
        enumerable: true,
        configurable: true
    });
}
defineCss("rippleColor");
defineCss("rippleAlpha");
defineCss("rippleDuration");
defineCss("fadeDuration");
/*
View.prototype.perfomRipple = function (): Promise<any> {
    if (this instanceof RippleLayout) {
        return (<RippleLayout>this).perfomRipple();
    } else if (this.parent) {
        return this.parent.perfomRipple();
    } else {
        throw "Could not found ripple layout";
    }
}*/
//
export class RippleLayout extends AbsoluteLayout {

    perfomRipple(): Promise<any> {
        return new Promise((resolve, reject) => {
            //PREPARE
            const bounds: Bounds = DimUtils.toBounds(this, <any>this.parent);
            const center = DimUtils.centerOf(bounds);
            const square = DimUtils.tallerSquare(bounds);
            const radius = square.size.width / 2;
            const origin = DimUtils.makeCenterOf(square, center).origin;
            //
            const size = radius * 2;
            //RIPPLE
            const rippleView = new Label;
            rippleView.borderRadius = radius;
            rippleView.backgroundColor = this.rippleColor || new Color("#cecece");
            rippleView.opacity = this.rippleAlpha || 0.22;//0.22;//0.12;
            rippleView.scaleX = 0.01;
            rippleView.scaleY = 0.01;
            rippleView.width = size;
            rippleView.height = size;
            rippleView.top = origin.top;
            rippleView.left = origin.left;
            this.addChild(rippleView);
            //ANMATE
            const durationScale = this.rippleDuration || 200;//200 * (options.speedAnimation || 1)
            const durationOpaque = this.fadeDuration || 300;//300 * (options.speedAnimation || 1)
            const animations = [];
            animations.push(rippleView.animate({ scale: { x: 1, y: 1 }, duration: durationScale, curve: AnimationCurve.easeOut }));
            animations.push(rippleView.animate({ opacity: 0, duration: durationOpaque, curve: AnimationCurve.easeOut }));
            let promise = Promise.all(animations);
            const onFinish = (e) => {
                this.removeChild(rippleView);
                e[0] ? reject(e) : resolve();
            };
            promise.then(onFinish).catch(onFinish);
        })
    }

}
