import * as common from "./anchor.common";
export * from "./anchor.common";
import { layout } from "ui/core/view";//AUGMEN PAGE
import { getKeyboardListener } from  "nativescript-nbmaterial-layouts/form";//AUGMEN PAGE

common.AnchorBehaviour.init = (strategies: symbol[], scrollViewId: string): AnchorBehaviour => {
    return new AnchorBehaviour(strategies, scrollViewId);
}
export class AnchorBehaviour extends common.AnchorBehaviour {

    getScrollheightVisible(): number {
        let sizeKey = getKeyboardListener().getKeyboardSizePx();
        let top = this.scrollView.getLocationOnScreen().y;
        let topKey = layout.toDeviceIndependentPixels(sizeKey.top);
        return topKey - top;
    }
    isFullyVisible(): boolean {
        let sizeKey = getKeyboardListener().getKeyboardSizePx();
        let topKey = layout.toDeviceIndependentPixels(sizeKey.top);
        let topScroll = this.scrollView.getLocationOnScreen().y;
        //
        let location = this.view.getLocationOnScreen();
        let size = this.view.getActualSize();
        let bottom = location.y + size.height;
        //
        if (bottom <= topKey && topScroll <= location.y) {
            return true;
        } else {
            return false;
        }
    }
}