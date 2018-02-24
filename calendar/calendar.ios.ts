import * as common from "./calendar.common";
import { GridLayout, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout';
export * from "./calendar.common";
import { layout } from "ui/core/view";
import { GestureTypes, GestureEventData } from "ui/gestures";


export class Calendar extends common.Calendar {
    createRows(rows) {
        //NEVER ADD OR REMOVE ROWS ELSE HEIGHT =0
        const MAX_ROWS = 7;
        if (this.getRows().length < MAX_ROWS) {
            for (let i = 0; i < MAX_ROWS; i++) {
                this.addRow(new ItemSpec(1, "star"));
            }
        }
    }
    onClick(e: GestureEventData) {
        let gestureRecognizer: UITapGestureRecognizer = e.ios;
        let view = gestureRecognizer.view;
        let loc = gestureRecognizer.locationInView(view);
        let subview = view.hitTestWithEvent(loc, null);
        for (let i = 0; i < this.days.length; i++) {
            let day = this.days[i];
            if (day.nativeView === subview) {
                this.notifyTapped(day);
                return;
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