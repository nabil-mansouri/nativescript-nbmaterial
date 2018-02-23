import * as common from './bottomsheet.common';
import * as app from "tns-core-modules/application"
import { View, Color } from "tns-core-modules/ui/core/view";
import { Page } from "tns-core-modules/ui/page";
import { topmost } from "tns-core-modules/ui/frame";
import { ios } from "tns-core-modules/utils/utils";
import { GestureTypes, GestureEventData } from "ui/gestures";

export { knownTemplates } from './bottomsheet.common';
export class ModalPage extends common.ModalPage {
    iosReal: UIViewController;
    get _ios(): UIViewController {
        if (this.iosReal) {
            this.iosReal.modalPresentationStyle = UIModalPresentationStyle.OverFullScreen;
        }
        return this.iosReal;
    }
    set _ios(v: UIViewController) {
        this.iosReal = v;
    }
    hideFinish() {
        let parent = topmost().currentPage;
        let parentController = parent["_ios"];
        //REMOVE PROXY WHEN FINISHED
        if (parentController["$proxied"]) {
            parentController.presentViewControllerAnimatedCompletion = parentController["$proxied"][0];
            parentController.dismissModalViewControllerAnimated = parentController["$proxied"][1];
            delete parentController["$proxied"];
        }
    }
    show() {
        this.backgroundSpanUnderStatusBar = true;
        let parent = topmost().currentPage;
        let parentController = parent["_ios"];
        //FIX ANIMATION USING PROXY
        if (!parentController["$proxied"]) {
            let oldPresent = parentController.presentViewControllerAnimatedCompletion;
            parentController.presentViewControllerAnimatedCompletion = function (el, anim, compl) {
                oldPresent.call(this, el, false, compl);
            }
            let oldDismiss = parentController.dismissModalViewControllerAnimated;
            parentController.dismissModalViewControllerAnimated = function (anim) {
                oldDismiss.call(this, false);
            }
            parentController["$proxied"] = [oldPresent, oldDismiss];
        }
        this.backgroundColor = new Color("rgba(0,0,0,0.2)");
        super.show();
    }

    handleTapEvent() {
        this.on("tap", (e) => {
            if (this.isHideEvent(<any>e)) {
                this.hide();
            }
        });
    }
    isHideEvent(e: GestureEventData): boolean {
        //https://stackoverflow.com/questions/2788870/find-which-child-view-was-tapped-when-using-uitapgesturerecognizer
        //FIND VIEW CLICKED....
        let gestureRecognizer: UITapGestureRecognizer = e.ios;
        let view = gestureRecognizer.view;
        let loc = gestureRecognizer.locationInView(view);
        let subview = view.hitTestWithEvent(loc, null);
        return this.content.nativeView == subview;
    }
}

export class BottomSheetModal extends common.BottomSheetModalBase {

    createPage(): ModalPage {
        return new ModalPage(new WeakRef(this));
    }
}

/*
class MDCBottomSheetControllerDelegateImpl extends NSObject implements MDCBottomSheetControllerDelegate {
    private _owner: WeakRef<BottomSheetModal>;

    public static initWithOwner(owner: WeakRef<BottomSheetModal>) {
        let handler = <MDCBottomSheetControllerDelegateImpl>MDCBottomSheetControllerDelegateImpl.new();
        handler._owner = owner;
        return handler;
    }

    bottomSheetControllerDidDismissBottomSheet(controller: MDCBottomSheetController): void {
        if (this._owner.get()) {
            this._owner.get().setOpened(false);
        }
    }
    public static ObjCExposedMethods = {
        "bottomSheetControllerDidDismissBottomSheet": { returns: interop.types.void, params: [interop.types.id] }
    }
}

export class BottomSheetModal extends BottomSheetModalBase {
    controlRef: WeakRef<MDCBottomSheetController>;
    protected getDimension(): Promise<{ width: number, height: number }> {
        return new Promise((resolve, reject) => {
            let height = this.iosNewPage.view.layer.bounds.size.height;
            let width = this.iosNewPage.view.layer.bounds.size.width;
            resolve({ width, height });
        })
    }
    setOpened(o: boolean) {
        this._opened = o;
    }
    get iosPage(): UIViewController {
        return topmost().currentPage.ios;
    }
    get iosNewPage(): UIViewController {
        let newPage = this.newPage;
        if (!newPage.nativeView) {
            newPage._setupUI(this.context);
        }
        return this.newPage.ios;
    }
    protected fixStyle() {
        //this.iosNew.modalPresentationStyle = UIModalPresentationStyle.OverFullScreen;
    }
    show() {
        if (this._opened) {
            return;
        }
        let control = MDCBottomSheetController.new();
        control.initWithContentViewController(this.iosNewPage);
        control.delegate = MDCBottomSheetControllerDelegateImpl.initWithOwner(new WeakRef(this));
        this.iosPage.presentViewControllerAnimatedCompletion(control, true, () => {
            this._opened = true;
        });
        this.controlRef = new WeakRef(control);
    }
    hide() {
        if (this.controlRef.get() && this._opened) {
            let control = this.controlRef.get();
            control.dismissViewControllerAnimatedCompletion(true, () => {
                this._opened = false;
            })
        }
    }

}

*/