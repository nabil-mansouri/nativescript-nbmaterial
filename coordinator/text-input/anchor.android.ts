import * as common from "./anchor.common";
export * from "./anchor.common";

common.AnchorBehaviour.init = (strategies: symbol[], scrollViewId: string): AnchorBehaviour => {
    return new AnchorBehaviour(strategies, scrollViewId);
}
export class AnchorBehaviour extends common.AnchorBehaviour {

    getScrollheightVisible(): number {
        return this.scrollView.getActualSize().height;
    }
    isFullyVisible(): boolean {
        let native: android.view.View = this.view.nativeView;
        let rect = new android.graphics.Rect();
        if (native.getGlobalVisibleRect(rect)
            && native.getHeight() == rect.height()
            && native.getWidth() == rect.width()) {
            return true;
        } else {
            return false;
        }
    }
}