import { View, Color, Length, CssProperty, zeroLength, isIOS } from "ui/core/view";
import { Style } from "ui/styling/style";

export const maxHeightProperty = new CssProperty<Style, Length>({
    name: "maxHeight",
    cssName: "max-height",
    defaultValue: zeroLength,
    affectsLayout: isIOS,
    equalityComparer: Length.equals,
    valueConverter: Length.parse
});
maxHeightProperty.register(Style);

Object.defineProperty(View.prototype, "maxHeight", {
    get: function () {
        const self: View = this;
        return self.style.maxHeight;
    },
    set: function (s) {
        const self: View = this; 
        self.style.maxHeight = s;
    },
    enumerable: true,
    configurable: true
});