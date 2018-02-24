

export declare const elevationProperty: CssProperty<Style, number>;

declare module "tns-core-modules/ui/styling/style" {
    interface Style {
        elevation: number;
    }
}
declare module "tns-core-modules/ui/styling/background" {
    interface Background {
        elevation: number;
    }
}
declare module "tns-core-modules/ui/core/view" {
    interface View {
        elevation: number;
        getElevationDefault(): number;
        setElevationNative(back: Background);
    }
}