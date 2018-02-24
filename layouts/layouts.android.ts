import { View, layout } from "ui/core/view";
import { Page } from "ui/page";
import { Frame, topmost } from "ui/frame";
import "./layouts";//MUST IMPORT
import "./layouts.common";//MUST IMPORT

function listenFirstLayout(native: android.view.View, resolve, reject) {
    const nativeRef = new WeakRef(native);
    const listener = new android.view.View.OnLayoutChangeListener({
        onLayoutChange(param0: android.view.View, param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number) {
            if (nativeRef && nativeRef.get()) {
                nativeRef.get().removeOnLayoutChangeListener(listener);
            }
            resolve();
        }
    })
    native.addOnLayoutChangeListener(listener);
}
View.prototype["waitNextLayout"] = function () {
    return new Promise<any>((resolve, reject) => {
        if (this.nativeView) {
            const native: android.view.View = this.nativeView;
            listenFirstLayout(native, resolve, reject);
        } else {
            this.on("loaded", () => {
                const native: android.view.View = this.nativeView;
                listenFirstLayout(native, resolve, reject);
            });
        }
    });
}
Page.prototype["setStatusBarTranslucent"] = function (translucent: boolean) {
    let windows: android.view.Window = this._context.getWindow();
    //CLEAR FLAG BEFORE ADDING IT (ELSE SPACE ON BOTTOM BECAUSE OF MULTIPLE FLAGS)
    if (translucent) {
        windows.clearFlags(android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        windows.addFlags(android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
    } else {
        windows.clearFlags(android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
    }
    windows.clearFlags(android.view.WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
    windows.addFlags(android.view.WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
}
Page.prototype["getStatusBarHeight"] = function () {
    return 24;
}


Page.prototype["getStatusBarHeightPx"] = function () {
    const self: Page = this;
    return layout.toDevicePixels(self.getStatusBarHeightDip());
}
Page.prototype["getStatusBarHeightDip"] = function () {
    return 24;
}