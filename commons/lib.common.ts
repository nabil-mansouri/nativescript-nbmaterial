import { Property, Style, CssProperty, Color, View, backgroundInternalProperty, isIOS } from 'tns-core-modules/ui/core/view';
import { AbsoluteLayout } from 'tns-core-modules/ui/layouts/absolute-layout';
import { LayoutBase } from 'tns-core-modules/ui/layouts/layout-base';
import { layout } from 'tns-core-modules/utils/utils';
import { Label } from 'tns-core-modules/ui/label';
import { topmost } from 'tns-core-modules/ui/frame';
import { AnimationCurve } from 'tns-core-modules/ui/enums';

import { Background } from "tns-core-modules/ui/styling/background";
declare module "tns-core-modules/ui/styling/style" {
    interface Style {
        rippleColor: Color;
    }
}

export { Background };

export interface Point {
    top: number, left: number
}
export interface Size {
    width: number, height: number
}
export interface Bounds {
    origin: Point, size: Size;
}
export class DimUtilsBase {
    //TODO ne plus utiliser ces methodes (augmenter view pour detecter le next layout)
    /**
     *   
        View.prototype["onFirsLayout"] = function (callback) {
            if (isIOS) {

            } else {
                const self = new WeakRef(this);
                let listener = new android.view.View.OnLayoutChangeListener({
                    onLayoutChange(v: android.view.View, left: number, top: number, right: number, bottom: number, oldLeft: number, oldTop: number, oldRight: number, oldBottom: number): void {
                        callback(left, top, right, bottom);
                        if (self.get()) {
                            (<android.view.View>self.get().android).removeOnLayoutChangeListener(listener)
                        }
                    }
                });
                (<android.view.View>this.android).addOnLayoutChangeListener(listener);
            }
        } 
     */
    static onLayoutReady(view: View, callback: () => void) {
        throw "not implemented on :DimUtilsBase (use get instance)";
    }
    static onNextLayout(view: View, callback: () => void) {
        throw "not implemented on :DimUtilsBase (use get instance)";
    }
    static vector(origin: Point, dest: Point): Point {
        return {
            left: dest.left - origin.left,
            top: dest.top - origin.top
        }
    }
    static bounds(top: number, left: number, width: number, height: number): Bounds {
        return {
            origin: {
                top,
                left
            }, size: {
                height, width
            }
        }
    }
    static tallerSide(dim: Bounds) {
        return Math.max(dim.size.height, dim.size.width);
    }
    static tallerSquare(bounds: Bounds) {
        bounds = Object.assign({}, bounds);
        const side = Math.max(bounds.size.height, bounds.size.width);
        bounds.size.width = side;
        bounds.size.height = side;
        return bounds;
    }
    static centerOf(dim: Bounds): Point {
        return {
            left: (dim.origin.left + dim.size.width / 2),
            top: (dim.origin.top + dim.size.height / 2)
        }
    }
    static makeCenterOf(bounds: Bounds, center: Point) {
        bounds = Object.assign({}, bounds);
        bounds.origin.left = center.left - (bounds.size.width / 2);
        bounds.origin.top = center.top - (bounds.size.height / 2);
        return bounds;
    }

    static toBounds(view: View, parent: View): Bounds {
        const origin = view.getLocationRelativeTo(parent);
        const size = view.getActualSize();
        return { origin: { left: origin ? origin.x : 0, top: origin ? origin.y : 0 }, size }
    }
    static toBoundsScreen(view: View): Bounds {
        const origin = view.getLocationOnScreen();
        const size = view.getActualSize();
        return { origin: { left: origin ? origin.x : 0, top: origin ? origin.y : 0 }, size }
    }
}
export abstract class UIServiceBase {
    static addOnScreen(view: View, origin: Bounds) {
        throw "not implemented on :UIServiceBase (use get instance)";
    }
    static removeOnScreen(view: View) {
        throw "not implemented on :UIServiceBase (use get instance)";
    }
    static nearestLayout(view: View) {
        if (view instanceof LayoutBase) {
            return view;
        } else {
            let parent = view.parent;
            while (parent) {
                if (parent instanceof LayoutBase) {
                    return parent;
                }
                parent = view.parent;
            }
            throw "Could not find layout for view:" + view;
        }
    }
}
