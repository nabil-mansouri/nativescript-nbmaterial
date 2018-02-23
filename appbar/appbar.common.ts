import { GridLayout, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { topmost, Frame } from 'tns-core-modules/ui/frame';
import { Background } from 'tns-core-modules/ui/styling/background';
import { Label } from 'tns-core-modules/ui/label';
import { GestureTypes } from 'tns-core-modules/ui/gestures';
import { translateYProperty, layout } from 'tns-core-modules/ui/core/view';
import { Interpolator } from '../coordinator/behaviours/interpolator';
import * as def from "./appbar";
import "nativescript-nbmaterial-elevation";//NEED TO aUGMENT VIEW
import "nativescript-nbmaterial-ripple";//NEED TO aUGMENT VIEW
import "nativescript-nbmaterial-layouts"//NEED TO AUGMENT PAGE

export class AppBarLayout extends GridLayout implements def.AppBarLayout {
    statusBarStyle: "light" | "dark" = "light";
    statusBarFixed = true;
    interpolator: Interpolator;
    initNativeView() {
        super.initNativeView();
        this.verticalAlignment = "top";
    }
    onLoaded() {
        super.onLoaded();
        this.onFirstLayout(() => {
            this.interpolator = new Interpolator();
            this.interpolator.inRange(-this.getActualSize().height, 0);
            this.interpolator.outRange(0, 1);
        })
    }
    [translateYProperty.setNative](n) {
        super[translateYProperty.setNative](n); 
        this.eachChild((c) => {
            if (c instanceof AppBarTitle || c instanceof AppBarIcon) {
                c.opacity = 1 + n / 56; 
            }
            return true;
        })
    }
}

export class AppBarIcon extends Label implements def.AppBarIcon {
    action: "back" | "forward" = null;
    initNativeView() {
        super.initNativeView();
        this.on(GestureTypes.tap, () => {
            this.startRippleNative({ iosRadiusFactor: 1.5 });
            if (this.action == "back") {
                topmost().goBack();
            }
        })
    }
    [translateYProperty.setNative](n) {
        super[translateYProperty.setNative](n);
        console.log("YEAH")
    }
}

export class AppBarTitle extends Label implements def.AppBarTitle {
    initNativeView() {
        super.initNativeView();
        this.textWrap = false;
    }
}
export class AppBarStatus extends Label implements def.AppBarStatus {
    initNativeView() {
        super.initNativeView();
        this.height = this.page.getStatusBarHeightDip();
    }
}