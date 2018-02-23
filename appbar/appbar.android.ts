import { Color, backgroundInternalProperty } from 'tns-core-modules/ui/core/view';
import { Background } from 'tns-core-modules/ui/styling/background';
import * as common from "./appbar.common";
export * from "./appbar.common";

export class AppBarLayout extends common.AppBarLayout {
    protected _needStatusUpdate = true;
    [backgroundInternalProperty.setNative](back: Background) {
        super[backgroundInternalProperty.setNative](back);
        if (back && !this.page.statusBarTranslucent) {
            this.page.androidStatusBarBackground = back.color;
        }
    }
    onLoaded() {
        super.onLoaded();
        if (this._needStatusUpdate) { 
            this.page.backgroundSpanUnderStatusBar = true;
            this.page.actionBarHidden = true;
            this._needStatusUpdate = false;
        }
        if (this.page.statusBarTranslucent) {
            this.paddingTop = this.page.getStatusBarHeightDip();
            this.marginTop = 0;
        }
    }
}
