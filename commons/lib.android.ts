import { topmost } from 'tns-core-modules/ui/frame';
import { Property, Style, CssProperty, Color, View, backgroundColorProperty } from 'tns-core-modules/ui/core/view';
import { DimUtilsBase, Bounds, UIServiceBase } from "./lib.common";

export * from "./lib.common";


export class DimUtils extends DimUtilsBase {
    static onNextLayout(view: View, callback: () => void) {
        if (view.isLayoutValid) {
            callback();
        } else {
            const nativeView: android.view.View = view.android;
            let vto = nativeView.getViewTreeObserver();
            if (vto.isAlive()) {
                const listener = new android.view.ViewTreeObserver.OnGlobalLayoutListener({
                    onGlobalLayout: (): void => {
                        callback();
                        if (vto.removeGlobalOnLayoutListener) {
                            nativeView.getViewTreeObserver().removeGlobalOnLayoutListener(listener);
                        } else {
                            nativeView.getViewTreeObserver().removeOnGlobalLayoutListener(listener);
                        }
                    }
                });
                vto.addOnGlobalLayoutListener(listener);
            } else {
                console.error("ViewTreeObserver not alive");
            }
        }
    }
    static onLayoutReady(view: View, callback: () => void) {
        if (view.isLoaded) {
            callback();
        } else {
            const old = view.onLoaded;
            view.onLoaded = () => {
                old.call(view);
                const nativeView: android.view.View = view.android;
                let vto = nativeView.getViewTreeObserver();
                if (vto.isAlive()) {
                    const listener = new android.view.ViewTreeObserver.OnGlobalLayoutListener({
                        onGlobalLayout: (): void => {
                            callback();
                            if (vto.removeGlobalOnLayoutListener) {
                                nativeView.getViewTreeObserver().removeGlobalOnLayoutListener(listener);
                            } else {
                                nativeView.getViewTreeObserver().removeOnGlobalLayoutListener(listener);
                            }
                        }
                    });
                    vto.addOnGlobalLayoutListener(listener);
                } else {
                    console.error("ViewTreeObserver not alive");
                }
            }
        }
    }
}

export class UIService extends UIServiceBase {

    static addOnScreen(view: View, origin: Bounds) {
        try {
            const frame = topmost();
            let group: android.view.ViewGroup = frame.android.rootViewGroup;
            group = <any>group.getParent();
            if (!(group instanceof android.widget.FrameLayout)) {
                throw "should be an instance of framelayout";
            }
            let param = new android.widget.FrameLayout.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
            param.leftMargin = origin.origin.left;
            param.topMargin = origin.origin.top;
            param.width = origin.size.width;
            param.height = origin.size.height;
            group.addView(view.nativeView, param);
        } catch (e) {
            console.error(e);
            throw "failed to add on screen: " + e;
        }
    }

    static removeOnScreen(view: View) {
        const frame = topmost();
        let group: android.view.ViewGroup = frame.android.rootViewGroup;
        group = <any>group.getParent();
        if (!(group instanceof android.widget.FrameLayout)) {
            throw "should be an instance of framelayout";
        }
        group.removeView(view.nativeView);
    }
}

