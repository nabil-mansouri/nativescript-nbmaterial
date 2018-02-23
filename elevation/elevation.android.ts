import { View, Color } from "ui/core/view";
import { Background } from "ui/styling/background"; 
import "./elevation.common";//MUST IMPORT

View.prototype.getElevationDefault = function () {
    const native = <android.view.View>this.nativeView;
    return native && native.getElevation ? native.getElevation() : 0;
}
View.prototype.setElevationNative = function (back: Background) {
    const native = <android.view.View>this.nativeView;
    const color = back.color ? back.color.android : new Color("transparent").android;
    //
    if (back.hasBorderRadius()) {
        const shape = new android.graphics.drawable.GradientDrawable();
        shape.setShape(android.graphics.drawable.GradientDrawable.OVAL);
        shape.setColor(color);
        native.setBackgroundDrawable(shape);
    } else {
        native.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(color));
    }
    //SET ELEVATION
    native.setElevation(back.elevation);
}