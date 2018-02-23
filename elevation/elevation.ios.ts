import { View, Color } from "ui/core/view";
import { Background } from "ui/styling/background";
import "../layouts";//MUST IMPORT 
import "./elevation.common";//MUST IMPORT 

function onScroll(this: void, args): void {
    const view = <View>args.object;
    const nativeView = view.nativeViewProtected;
    if (nativeView instanceof UIScrollView) {
        adjustLayersForScrollView(<any>nativeView);
    }
}

function subscribeForScrollNotifications(view: View) {
    if (view.nativeViewProtected instanceof UIScrollView) {
        view.on("scroll", onScroll);
        adjustLayersForScrollView(<any>view.nativeViewProtected);
    }
}

function adjustLayersForScrollView(nativeView: UIScrollView) {
    const layer = getMDCLayer(nativeView);
    if (layer) {
        CATransaction.begin();
        CATransaction.setValueForKey(kCFBooleanTrue, kCATransactionDisableActions);
        const offset = nativeView.contentOffset;
        const transform = { a: 1, b: 0, c: 0, d: 1, tx: offset.x, ty: offset.y };
        layer.setAffineTransform(transform);
        if (layer.mask) {
            layer.mask.setAffineTransform(transform);
        }
        CATransaction.commit();
    }
}
function getMDCLayer(nativeView: UIView): MDCShadowLayer {
    for (let i = 0; i < nativeView.layer.sublayers.count; i++) {
        let current = nativeView.layer.sublayers.objectAtIndex(i);
        if (current instanceof MDCShadowLayer) {
            return current;
        }
    }
    return null;
}


View.prototype.getElevationDefault = function () {
    return 0;
}
View.prototype.setElevationNative = function (back: Background) {
    const nativeView: UIView = this.nativeView;
    if (nativeView.layer instanceof MDCShadowLayer) {
        const layer: MDCShadowLayer = nativeView.layer;
        layer.elevation = back.elevation;
    } else if (this["$fixElevation"]) {
        let layer = getMDCLayer(nativeView);
        //SUBLAYER FOR ELEVATION EXISTS
        if (layer == null) {
            throw "Should have a Shadow layer";
        }
        layer.elevation = back.elevation;
    } else {
        subscribeForScrollNotifications(this);
        (<View>this).onFirstLayout(() => {
            if (this["$fixElevation"]) {
                return;
            }
            //ADD SUBLAYER FOR ELEVATION  
            this["$fixElevation"] = true;
            nativeView.layer.masksToBounds = false;
            const color = nativeView.layer.backgroundColor;
            nativeView.layer.backgroundColor = null;
            const layer = MDCShadowLayer.new().initWithLayer(nativeView.layer);
            layer.masksToBounds = false;
            layer.elevation = back.elevation;
            layer.shadowColor = UIColor.blackColor.CGColor;
            layer.bounds = CGRectMake(0, 0, nativeView.bounds.size.width, nativeView.bounds.size.height);
            //
            if (nativeView instanceof UIScrollView) {
                let scroll = <UIScrollView>nativeView;
                layer.bounds = CGRectMake(0, 0, scroll.contentSize.width, scroll.contentSize.height);
            }
            //
            layer.position = CGPointMake(nativeView.bounds.size.width / 2, nativeView.bounds.size.height / 2);
            if (back.hasBorderRadius()) {
                const path = UIBezierPath.bezierPathWithOvalInRect(nativeView.bounds);
                layer.shadowPath = path.CGPath;
                let mask = <CAShapeLayer>nativeView.layer.mask;
                if (!mask) {
                    mask = CAShapeLayer.layer();
                    mask.path = path.CGPath;
                }
                nativeView.layer.mask = null;
                mask.fillColor = color;
                layer.addSublayer(mask);
            } else {
                layer.backgroundColor = color;
            }
            nativeView.layer.insertSublayerAtIndex(layer, 0);
        })
    }
}

