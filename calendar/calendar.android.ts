import { GestureTypes, GestureEventData } from "ui/gestures";
import { GridLayout, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout';
import * as common from "./calendar.common";
export * from "./calendar.common";


export class Calendar extends common.Calendar {
    createRows(rows) {
        this.removeRows();
        for (let i = 0; i < rows; i++) {
            this.addRow(new ItemSpec(1, "star"));
        }
    }
    onClick(e: GestureEventData) {
        let motionEvent: android.view.MotionEvent = e.android;
        let _bounds = new android.graphics.Rect();
        for (let i = 0; i < this.days.length; i++) {
            let day = this.days[i];
            if (day.visibility == "visible") {
                let view: android.view.View = day.nativeView;
                view.getHitRect(_bounds);
                if (_bounds.contains(motionEvent.getX(), motionEvent.getY())) {
                    this.notifyTapped(day);
                    return;
                }
            }
        }
    }
    createDay() {
        return new CalendarDay();
    }
}

export class CalendarMonthLayout extends common.CalendarMonthLayout {
    create() {
        return new Calendar();
    }
}

export class CalendarDay extends common.CalendarDay {

}
