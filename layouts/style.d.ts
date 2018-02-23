import { Length, Style, CssProperty } from "tns-core-modules/ui/core/view";

declare module "tns-core-modules/ui/styling/style" {
    interface Style {
        maxHeight: Length;
    }
}

declare module "tns-core-modules/ui/core/view" {
    interface View {
        maxHeight: Length;
    }
}

export const maxHeightProperty: CssProperty<Style, Length>;