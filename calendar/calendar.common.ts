import { GridLayout, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout';
import { AbsoluteLayout } from 'tns-core-modules/ui/layouts/absolute-layout';
import { Label } from 'tns-core-modules/ui/label';
import { Button } from 'tns-core-modules/ui/button';
import { Property, booleanConverter, layout } from "ui/core/view";
import { GestureTypes, GestureEventData, SwipeGestureEventData, SwipeDirection } from "ui/gestures";
import { Calendar as CalendarDef, CalendarMonthLayout as CalendarMonthDef, DayTappedEvent } from "./calendar";
import "nativescript-nbmaterial-elevation/elevation";//NEED TO aUGMENT VIEW
import "nativescript-nbmaterial-ripple/ripple";//NEED TO aUGMENT VIEW
import 'nativescript-nbmaterial-layouts/layouts';//NEED TO AUGMENT PAGE
function safeArray(all: any[]) {
    if (!(all instanceof Array)) {
        return [];
    }
    return all;
}
function datesContains(dates: Date[], d: Date) {
    return dates.map(Number).indexOf(+d) > -1;
}
function datesRemove(dates: Date[], d: Date) {
    let idx = dates.map(Number).indexOf(+d);
    if (idx > -1) {
        dates.splice(idx, 1);
    }
}
function compareDate(d1: Date, d2: Date) {
    if (d1 instanceof Date && d2 instanceof Date) {
        return d1.getTime() == d2.getTime();
    }
    return d1 == d2;
}
function isLeapYear(year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};
function getDaysInMonth(year, month) {
    return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () {
    return isLeapYear(this.getFullYear());
};

Date.prototype.getDaysInMonth = function () {
    return getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};
Date.prototype.sameMonth = function (d: Date): boolean {
    return d.getMonth() == this.getMonth() && d.getFullYear() == this.getFullYear();
}
Date.prototype.sameDayOfMonth = function (d: Date) {
    return this.getDate() == d.getDate();
}
//TODO I18
function formatShort(d) {
    var monthNames = ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
    var day = d.getDate();
    var monthIndex = d.getMonth();
    var year = d.getFullYear();
    return monthNames[monthIndex] + ' ' + year;
}

export abstract class CalendarMonthLayout extends GridLayout implements CalendarMonthDef {
    public static dayTappedEvent: string = "dayTapped";
    public static monthChangedEvent: string = "monthChanged";
    //
    protected current: Calendar = null;
    protected other: Calendar = null;
    protected callBack = null;
    protected callSwipe = null;
    constructor() {
        super();
        this.current = this.create();
        this.other = this.create();
        //
        this.current.left = 0;
        this.current.top = 0;
        this.other.left = 0;
        this.other.top = 0;
        //
        this.addRow(new ItemSpec(1, "auto"));
        this.addRow(new ItemSpec(1, "auto"));
        this.addColumn(new ItemSpec(1, "star"));
        this.addColumn(new ItemSpec(5, "star"));
        this.addColumn(new ItemSpec(1, "star"));
        //
        this.other.row = 1;
        this.current.row = 1;
        this.other.colSpan = 3;
        this.current.colSpan = 3;
        this.addChild(this.current);
        this.addChild(this.other);
    }
    get multiple() { return this.current.multiple; }
    set multiple(d) {
        d = booleanConverter(d + "");
        this.current.multiple = d;
        this.other.multiple = d;
    }
    set selected(s) { this.current.selected = s; }
    get selected() { return this.current.selected; }
    get date() { return this.current.date; }
    set date(next) { this.current.date = next; }
    abstract create(): Calendar;
    createNativeView() {
        return super.createNativeView();
    }
    initNativeView() {
        super.initNativeView();
        this.other.visibility = "collapse";
        this.callBack = (e) => {
            this.notify(e);
        }
        this.callSwipe = (args: SwipeGestureEventData) => {
            switch (args.direction) {
                case SwipeDirection.right:
                    this.previous();
                    break;
                case SwipeDirection.left:
                    this.next();
                    break;
            }
        };
        this.current.on(Calendar.dayTappedEvent, this.callBack);
        this.other.on(Calendar.dayTappedEvent, this.callBack);
        this.current.on(GestureTypes.swipe, this.callSwipe);
        this.other.on(GestureTypes.swipe, this.callSwipe);
    }
    disposeNativeView() {
        this.current.off(GestureTypes.swipe, this.callSwipe);
        this.other.off(GestureTypes.swipe, this.callSwipe);
        this.current.off(Calendar.dayTappedEvent, this.callBack);
        this.other.off(Calendar.dayTappedEvent, this.callBack);
        this.current = null;
        this.other = null;
        super.disposeNativeView();
    }
    onLoaded() {
        super.onLoaded();
    }
    previous() {
        this.swap(-1);
    }
    next() {
        this.swap(1);
    }
    swap(nbMonth: number) {
        let copy = new Date(this.date);
        copy.addMonths(nbMonth);
        this.other.date = copy;
        this.other.update(false);//UPDATE with selected=
        this.other.selected = this.current.selected;
        //
        let promises = [];
        this.other.translateX = nbMonth * this.getMeasuredWidth();
        this.other.visibility = "visible";
        promises.push(this.current.animate({ translate: { x: -nbMonth * this.getMeasuredWidth(), y: 0 } }));
        promises.push(this.other.animate({ translate: { x: 0, y: 0 } }));
        Promise.all(promises).then(() => {
            let temp = this.current;
            this.current = this.other;
            this.other = temp;
            this.other.visibility = "collapse";
            //MUST BE CALLED WHEN SWAP FINISHED
            this.notify({ eventName: CalendarMonthLayout.monthChangedEvent, object: this });
        });
    }
}
/**
 * CALENDAR TITLE
 */
export class CalendarTitle extends Label {
    callBack = null;
    onLoaded() {
        super.onLoaded();
        this.col = 1;
        this.callBack = (e: DayTappedEvent) => {
            this.text = formatShort(this.calendar.date);
        }
        this.text = formatShort(this.calendar.date);
        this.calendar.on(CalendarMonthLayout.monthChangedEvent, this.callBack);
    }
    onUnloaded() {
        super.onUnloaded();
        this.calendar.off(CalendarMonthLayout.monthChangedEvent, this.callBack);
    }
    get calendar(): CalendarMonthLayout {
        return <any>this.parent;
    }
}

/**
 * CALENDAR ACTION
 */
export class CalendarAction extends Label {
    action: "previous" | "next";
    onLoaded() {
        super.onLoaded();
        this.col = this.action == "previous" ? 0 : 2;
        this.on(GestureTypes.tap, () => {
            this.action == "previous" ? this.calendar.previous() : this.calendar.next();
        })
    }
    get calendar(): CalendarMonthLayout {
        return <any>this.parent;
    }
}
/**
 * CALENDAR GRID
 */
export abstract class Calendar extends GridLayout implements CalendarDef {
    public static dayTappedEvent: string = "dayTapped";
    multiple: boolean;
    //
    protected _selected: Date | Date[];
    protected _needUpdate = true;
    protected _date = new Date();
    protected clickCallback = null;
    protected days: CalendarDay[] = [];
    protected daysName: CalendarDay[] = [];
    protected cellHeight: number = null;
    constructor() {
        super();
    }
    get date() { return this._date; }
    set date(next) {
        if (!this._date.sameMonth(next)) {
            this._needUpdate = true;
        }
        this._date = next;
    }
    createNativeView() {
        return super.createNativeView();
    }
    notifyTapped(view: CalendarDay) {
        this.toggleDay(view);
        let date = this.toDate(view);
        this.updateCssClasses();
        //
        let temp: DayTappedEvent = { tapped: date, selected: this.selected, view, eventName: Calendar.dayTappedEvent, object: this };
        this.notify(temp);
    }
    get selected() {
        return this._selected;
    }
    set selected(d) {
        if (this.multiple) {
            this._selected = safeArray(<any>d);
        } else {
            this._selected = d instanceof Date ? d : null;
        }
        this.updateCssClasses();
    }
    protected toDate(day: CalendarDay) {
        let value = parseInt(day.text);
        let date = new Date(this.date.getFullYear(), this.date.getMonth(), value, 0, 0, 0, 0);
        return date;
    }
    protected toggleDay(day: CalendarDay) {
        let date = this.toDate(day);
        if (this.multiple) {
            this.selected = safeArray(<any>this.selected);
            if (datesContains(<any>this.selected, this.toDate(day))) {
                datesRemove(<any>this.selected, date);
            } else {
                this.selected.push(date);
            }
        } else {
            this.selected = compareDate(<any>this.selected, date) ? null : date;
        }
    }
    protected updateCssClasses() {
        let toActivate: Date[] = [];
        if (this.multiple) {
            toActivate = this.selected ? <any>this.selected : toActivate;
        } else {
            toActivate = this.selected ? [<any>this.selected] : toActivate;
        }
        //
        let indexes = toActivate.filter(d => d.sameMonth(this.date)).map(d => d.getDate() - 1);
        for (let i = 0; i < this.days.length; i++) {
            let day = this.days[i];
            if (indexes.indexOf(i) > -1) {
                day.addCssClass("selected");
            } else {
                day.removeCssClass("selected");
            }
        }
    }
    abstract onClick(e: GestureEventData);
    initNativeView() {
        super.initNativeView();
        this.clickCallback = (e) => {
            this.onClick(e);
        }
        //DEPRECATED BECAUSE OF BUTTON
        //this.on(GestureTypes.tap, this.clickCallback);
        //
        let names = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
        for (let i = 0; i < 7; i++) {
            let d = this.createDay();
            this.addChild(d);
            d.addCssClass("dayname");
            d.col = i;
            d.row = 0;
            d.text = names[i];
            this.daysName.push(d);
        }
        for (let i = 0; i < 31; i++) {
            let d = this.createDay();
            this.addChild(d);
            this.days.push(d);
        }
        for (let i = 0; i < 7; i++) {
            this.addColumn(new ItemSpec(1, "star"));
        }
    }
    abstract createDay(): CalendarDay;
    disposeNativeView() {
        this.days = [];
        this.daysName = [];
        //this.off(GestureTypes.tap, this.clickCallback);
        super.disposeNativeView();
    }
    onLoaded() {
        super.onLoaded();
        if (this._needUpdate) {
            this.update(true);
        }
    }
    abstract createRows(rows: number);
    update(withSelected: boolean) {
        let firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        //PB nb days car day of week dim =0=> dim=6
        let dayOfWeek = (firstDay.getDay() + 6) % 7;
        let nbDays = firstDay.getDaysInMonth();
        let total = dayOfWeek + nbDays;
        let rows = Math.ceil(total / 7);//UPPDER INTEGER
        rows++;//ADD DAY NAMES
        this.createRows(rows);
        //
        let colNum = dayOfWeek;//Monday =1
        let rowNum = 1;//BECAUSE OF DAY NAME
        let now = new Date();
        let nowDay = now.getDate();
        let samePeriod = firstDay.sameMonth(now);
        for (let index = 1; index <= 31; index++) {
            let day = this.days[index - 1];
            if (samePeriod && index == nowDay) {
                day.addCssClass("today");
            } else {
                day.removeCssClass("today");
            }
            //
            if (index <= nbDays) {
                day.visibility = "visible";
                GridLayout.setColumn(day, colNum);
                GridLayout.setRow(day, rowNum);
                day.text = index + "";
                if (index <= 9) {
                    day.removeCssClass("big");
                } else {
                    day.addCssClass("big");
                }
            } else {
                day.visibility = "collapse";
            }
            colNum++;
            //NEXT LINE
            if (7 <= colNum) {
                colNum = 0;
                rowNum++;
            }
        }
        if (withSelected) {
            this.updateCssClasses();
        }
    }
}

export abstract class CalendarDay extends Button {
    callback = null;
    onLoaded() {
        super.onLoaded();
        this.callback = () => {
            (<Calendar>this.parent).notifyTapped(this);
        };
        this.on(Button.tapEvent, this.callback);
    }
    onUnloaded() {
        super.onUnloaded();
        this.off(Button.tapEvent, this.callback);
    }
}

