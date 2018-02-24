import * as common from './bottomsheet.common';

export { knownTemplates } from './bottomsheet.common';

export class ModalPage extends common.ModalPage {
    hideFinish() {
    }
    handleTapEvent() {
        this.on("tap", (e) => {
            this.hide();
        });
        this.templateView.on("tap", (e) => {
            //AVOID HIDE
        });
    }
}

export class BottomSheetModal extends common.BottomSheetModalBase {
    createPage(): ModalPage {
        return new ModalPage(new WeakRef(this));
    }
}