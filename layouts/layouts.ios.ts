import { View, layout } from "ui/core/view";
import { Page } from "ui/page";
import * as utilsUI from "ui/utils";
import { Frame, topmost } from "ui/frame";
import "./layouts.common";//MUST IMPORT 

View.prototype["waitNextLayout"] = function () {
    const self: View = this;
    return new Promise<any>((resolve, reject) => {
        const old = self.onLayout;
        self.onLayout = function () {
            old.apply(this, arguments);
            self.onLayout = old;
            resolve();
        }
    })
}

Page.prototype["setStatusBarTranslucent"] = function (translucent: boolean) {
    const self = <Page>this;
    if (translucent) {
        self.backgroundSpanUnderStatusBar = true;
        UIApplication.sharedApplication.setStatusBarStyleAnimated(UIStatusBarStyle.BlackTranslucent, false);
        self.marginTop = -self.getStatusBarHeightDip();
    } else {
        UIApplication.sharedApplication.setStatusBarStyleAnimated(UIStatusBarStyle.Default, false);
        self.marginTop = 0;
    }
}
Page.prototype["getStatusBarHeightPx"] = function () {
    return utilsUI.ios.getStatusBarHeight();
}
Page.prototype["getStatusBarHeightDip"] = function () {
    const self: Page = this;
    return layout.toDeviceIndependentPixels(self.getStatusBarHeightPx());
}