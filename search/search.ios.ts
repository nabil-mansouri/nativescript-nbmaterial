import { View, Color } from "ui/core/view";
import * as common from "./search.common";
import { GestureTypes, GestureEventData } from "ui/gestures";
export { SearchBar, SearchField, SearchIcon, knownTemplates, barTemplateProperty, resultTemplateProperty } from "./search.common";

export class ModalPage extends common.ModalPage {
    iosReal: UIViewController;
    callback;
    get _ios(): UIViewController {
        if (this.iosReal) {
            this.iosReal.modalPresentationStyle = UIModalPresentationStyle.OverFullScreen;
        }
        return this.iosReal;
    }
    set _ios(v: UIViewController) {
        this.iosReal = v;
    }
    unhandleTapEvent() {
        this.off("tap", this.callback);
        this.callback = null;
    }
    handleTapEvent() {
        if (!this.callback) {
            this.callback = (e) => {
                if (this.isHideEvent(<any>e)) {
                    this.throwHideEvent();
                }
            };
            this.on("tap", this.callback);
        }
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
export class SearchBarModal extends common.SearchBarModal {
    onHide() {
        super.onHide();
        let parent = this.page;
        let parentController = parent["_ios"];
        //REMOVE PROXY WHEN FINISHED
        if (parentController["$proxied"]) {
            parentController.presentViewControllerAnimatedCompletion = parentController["$proxied"][0];
            parentController.dismissModalViewControllerAnimated = parentController["$proxied"][1];
            delete parentController["$proxied"];
        }
    }
    show() {
        //FIX ANIMATION USING PROXY
        let parent = this.page;
        let parentController = parent["_ios"];
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
            super.show();
        }
    }
    createPage(): common.ModalPage {
        let page = new ModalPage(new WeakRef(this));
        page.backgroundColor = new Color("rgba(0,0,0,0.4)");
        return page;
    }
}