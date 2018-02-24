import { topmost } from 'tns-core-modules/ui/frame';
import { Property, Style, CssProperty, Color, View } from 'tns-core-modules/ui/core/view';
import { DimUtilsBase, Bounds, UIServiceBase } from "./lib.common";


export * from "./lib.common";

export class DimUtils extends DimUtilsBase {

    static onNextLayout(view: View, callback: () => void) {
        if (view.isLayoutValid) {
            setTimeout(() => callback());//TIMEOUT FOR WAITING CHILDREN
        } else {
            const old = view.onLayout;
            view.onLayout = function () {
                view.onLayout = old;
                old.apply(view, arguments);
                const nativeView: UIView = view.ios;
                try {
                    setTimeout(() => callback());//TIMEOUT FOR WAITING CHILDREN
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
    static onLayoutReady(view: View, callback: () => void) {
        const old = view.onLoaded;
        if (view.isLoaded) {
            setTimeout(() => callback());//TIMEOUT FOR WAITING CHILDREN
        } else {
            view.onLoaded = () => {
                old.call(view);
                const nativeView: UIView = view.ios;
                try {
                    setTimeout(() => callback());//TIMEOUT FOR WAITING CHILDREN
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
}
export class UIService extends UIServiceBase {
    static addOnScreen(view: View, origin: Bounds) {
        try {
            const frame = topmost();
            let group: UINavigationController = frame.ios.controller;
            group.view.insertSubviewAtIndex(view.nativeView, 0)
        } catch (e) {
            console.error(e);
            throw "failed to add on screen: " + e;
        }
    }

    static removeOnScreen(view: View) {
        const frame = topmost();
        let native: UIView = view.ios;
        native.removeFromSuperview();
    }
}