import { Color, backgroundInternalProperty } from 'tns-core-modules/ui/core/view';
import { Background } from 'tns-core-modules/ui/styling/background';
import * as common from "./appbar.common";
export * from "./appbar.common";


export class AppBarLayout extends common.AppBarLayout {
    onLoaded() {
        super.onLoaded();
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.actionBarHidden = true;
        //NEED PLIST=>UIViewControllerBasedStatusBarAppearance=false
        if (this.page.statusBarTranslucent) {
            this.marginTop = 0;
            this.paddingTop = this.page.getStatusBarHeightDip();
        } else {
            this.marginTop = -this.page.getStatusBarHeightDip();
            this.page.style.paddingTop = this.page.getStatusBarHeightDip();
            switch (this.statusBarStyle) {
                case "light":
                    UIApplication.sharedApplication.setStatusBarStyleAnimated(UIStatusBarStyle.LightContent, false);
                    break;
                case "dark":
                    UIApplication.sharedApplication.setStatusBarStyleAnimated(UIStatusBarStyle.Default, false);
                    break;
            }
        }
    }
}
