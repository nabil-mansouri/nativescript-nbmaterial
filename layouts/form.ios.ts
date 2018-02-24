import * as app from "application";
import { Observable } from "data/observable";
import { Page, layout } from "ui/page";
import * as common from "./form.commons";
export * from "./form.commons";


class KeyboardNotificationListenerImpl extends NSObject {
    onShow: (size: CGRect) => void = null;
    onHide: () => void = null;
    public "keyboardWasShown:"(aNotification: NSNotification) {
        let kbRect: CGRect = null;
        let info: NSDictionary<any, any> = aNotification.userInfo;
        if (info) {
            kbRect = info.objectForKey(UIKeyboardFrameBeginUserInfoKey);
        }
        this.onShow(kbRect);
    }
    public "keyboardWillBeHidden:"(aNotification: NSNotification) {
        this.onHide();
    }
    // A selector will be exposed so it can be called from native.
    public static ObjCExposedMethods = {
        "keyboardWasShown:": { returns: interop.types.void, params: [interop.types.id] },
        "keyboardWillBeHidden:": { returns: interop.types.void, params: [interop.types.id] }
    };
}


export class KeyboardListenerImpl extends common.KeyboardListenerImpl {
    iosListener: KeyboardNotificationListenerImpl = null;
    listenKeyBoard() {
        if (this.iosListener != null) {
            return;
        }
        this.iosListener = <any>KeyboardNotificationListenerImpl.new();
        const selfRef = new WeakRef<KeyboardListenerImpl>(this);
        this.iosListener.onShow = (rect) => {
            let self = selfRef.get();
            if (!self) {
                return;
            }  
            self.sendShowKeyboard( {
                height: rect.size.height,
                width: rect.size.width,
                left: rect.origin.x,
                top: rect.origin.y
            });
        }
        this.iosListener.onHide = () => {
            let self = selfRef.get();
            if (!self) {
                return;
            } 
            self.sendHideKeyboard();
        }
        NSNotificationCenter.defaultCenter.addObserverSelectorNameObject(this.iosListener, "keyboardWasShown:", UIKeyboardDidShowNotification, null);
        NSNotificationCenter.defaultCenter.addObserverSelectorNameObject(this.iosListener, "keyboardWillBeHidden:", UIKeyboardWillHideNotification, null);
    }
    unlistenKeyBoard() {
        if (this.iosListener == null) {
            return;
        }
        NSNotificationCenter.defaultCenter.removeObserverNameObject(this.iosListener, UIKeyboardDidShowNotification, null);
        NSNotificationCenter.defaultCenter.removeObserverNameObject(this.iosListener, UIKeyboardWillHideNotification, null);
        this.iosListener = null;
    }
}

common.KeyboardListenerImpl.init = (): KeyboardListenerImpl => {
    return new KeyboardListenerImpl();
}