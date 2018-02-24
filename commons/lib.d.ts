import { Color, View, CssProperty } from 'tns-core-modules/ui/core/view';
import { AbsoluteLayout } from 'tns-core-modules/ui/layouts/absolute-layout';
import { LayoutBase } from 'tns-core-modules/ui/layouts/layout-base';
import { Style } from 'tns-core-modules/ui/styling/style';
import { DimUtilsBase, Bounds, UIServiceBase, Background, PropertyUtilsBase } from "./lib.common";

export interface Point {
    top: number;
    left: number;
}
export interface Size {
    width: number;
    height: number;
}
export interface Bounds {
    origin: Point;
    size: Size;
}
export declare class DimUtils {
    static vector(origin: Point, dest: Point): Point;
    static bounds(top: number, left: number, width: number, height: number): Bounds;
    static tallerSide(dim: Bounds): number;
    static tallerSquare(bounds: Bounds): Bounds;
    static centerOf(dim: Bounds): Point;
    static makeCenterOf(bounds: Bounds, center: Point): Bounds;
    static onLayoutReady(view: View, callback: () => void): void;
    static onNextLayout(view: View, callback: () => void): void;
    static toBounds(view: View, parent: View): Bounds;
}
export declare class UIService {
    static nearestLayout(view: View): LayoutBase;
    static addOnScreen(view: View, origin: Bounds): void;
    static removeOnScreen(view: View): void;
}
