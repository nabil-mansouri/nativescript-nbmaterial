import * as app from "application";
import { Observable } from "data/observable";
import { Page, layout } from "ui/page";
import * as common from "./form.commons";
export * from "./form.commons";


export class KeyboardListenerImpl extends common.KeyboardListenerImpl {
    androidListener: android.view.ViewTreeObserver.OnGlobalLayoutListener = null;
    KEYBOARD_MINHEIGHT_DIP = 80;//AT LEAST 80 DIP  
    listenKeyBoard() {
        if (this.androidListener != null) {
            return;
        }
        const selfRef = new WeakRef<KeyboardListenerImpl>(this); 
        const act: android.app.Activity = app.android.foregroundActivity || app.android.startActivity;
        const rootLayout = act.getWindow().getDecorView().findViewById(android.R.id.content); 
        this.androidListener = new android.view.ViewTreeObserver.OnGlobalLayoutListener({
            onGlobalLayout() {
                const act: android.app.Activity = app.android.foregroundActivity || app.android.startActivity;
                const rootLayout = act.getWindow().getDecorView().findViewById(android.R.id.content); 
                let self = selfRef.get();
                if (!rootLayout || !self) {
                    return;
                }
                //TEST
                const DIFF = layout.toDevicePixels(self.KEYBOARD_MINHEIGHT_DIP);
                let statusHeight = rootLayout.getTop();
                let bottomRoot = statusHeight + rootLayout.getHeight();
                let heightDiff = rootLayout.getRootView().getHeight() - rootLayout.getHeight();
                //
                if (DIFF < heightDiff) { 
                    self.sendShowKeyboard({
                        height: heightDiff,
                        left: 0,
                        top: bottomRoot,
                        width: rootLayout.getWidth()
                    });
                } else if (self.keyboardShown) {   
                    self.sendHideKeyboard();
                }
            }
        })
        rootLayout.getViewTreeObserver().addOnGlobalLayoutListener(this.androidListener);
    }
    unlistenKeyBoard() {
        if (this.androidListener == null) {
            return;
        }
        const act: android.app.Activity = app.android.foregroundActivity || app.android.startActivity;
        let content = act.getWindow().getDecorView().findViewById(android.R.id.content);
        content.getViewTreeObserver().removeOnGlobalLayoutListener(this.androidListener);
        this.androidListener = null;
    }
}

common.KeyboardListenerImpl.init = (): KeyboardListenerImpl => {
    return new KeyboardListenerImpl();
}