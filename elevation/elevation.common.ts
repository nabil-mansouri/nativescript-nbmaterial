import { View, Color, Style, CssProperty, isIOS, backgroundInternalProperty, } from "ui/core/view";
import { Background } from "ui/styling/background";

Object.defineProperty(View.prototype, "elevation", {
    get: function () { return this.style.elevation; },
    set: function (el) {
        this.style.elevation = el;
    },
    enumerable: true,
    configurable: true
});

const oldClone = Background.prototype["clone"];
Background.prototype["clone"] = function () {
    let b = oldClone.call(this);
    b.elevation = this.elevation;
    return b;
}
export const elevationProperty = new CssProperty<Style, number>({
    name: "elevation", affectsLayout: isIOS, cssName: "elevation",
    valueConverter: (val) => parseInt(val),
    valueChanged: (el, old, newVal) => {
        if (old != newVal) {
            let b = el.backgroundInternal["clone"]();
            b.elevation = newVal;
            el.backgroundInternal = b;
        }
    }
});
elevationProperty.register(Style);

View.prototype[elevationProperty.setNative] = (n) => { };
View.prototype[elevationProperty.getDefault] = function () {
    return this.getElevationDefault();
};
const oldBackground = View.prototype[backgroundInternalProperty.setNative];
View.prototype[backgroundInternalProperty.setNative] = function (value) {
    oldBackground && oldBackground.apply(this, arguments);
    if (value && value.elevation) {
        this.setElevationNative(value);
    }
}