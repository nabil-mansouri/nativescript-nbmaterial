import { View, Color } from "ui/core/view";
import * as common from "./search.common";
import { GestureTypes, GestureEventData } from "ui/gestures";
export { SearchBar, SearchIcon, knownTemplates, barTemplateProperty, resultTemplateProperty } from "./search.common";

export class SearchField extends common.SearchField {

    initNativeView() {
        super.initNativeView();
        let text = <android.widget.EditText>this.nativeView;
        text.setBackgroundDrawable(null)
    }
}

export class ModalPage extends common.ModalPage {
    callback;
    callbackVoid;
    handleTapEvent() {
        if (!this.callback) {
            this.callback = (e) => {
                this.throwHideEvent();
            };
            this.on("tap", this.callback);
        }
        if (!this.callbackVoid) {
            this.callbackVoid = (e) => {
                //AVOID HIDE
            };
            this.barView.on("tap", this.callbackVoid);
        }
    }
    unhandleTapEvent() {
        this.off("tap", this.callback);
        this.callback = null;
        this.barView.off("tap", this.callbackVoid);
        this.callbackVoid = null;
    }
}
export class SearchBarModal extends common.SearchBarModal {

    createPage(): common.ModalPage {
        let page = new ModalPage(new WeakRef(this));
        return page;
    }
}