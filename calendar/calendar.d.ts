import { EventData } from "data/observable";
import { View, Property } from 'tns-core-modules/ui/core/view';
import { Layout } from 'tns-core-modules/ui/layouts/layout';
import { CssProperty } from "tns-core-modules/ui/core/properties";
import { Style } from "tns-core-modules/ui/core/properties";
import { Label } from 'tns-core-modules/ui/label';
declare global {

    export interface Date {
        static isLeapYear(year: number): boolean;
        getDaysInMonth(year: number, month: number): number;
        isLeapYear(): boolean;
        getDaysInMonth(): number;
        addMonths(value: number): void;
        sameMonth(d: Date): boolean;
        sameDayOfMonth(d: Date): boolean;
    }
} 
export interface DayTappedEvent extends EventData {
    readonly tapped: Date;
    selected: Date | Date[];
    view: CalendarDay;
}
export declare class CalendarMonthLayout extends Layout {
    public static dayTappedEvent: string = "dayTapped";
    public static monthChangedEvent: string = "monthChanged";
    date: Date;
    multiple: boolean;
    selected: Date | Date[];
    next();
    previous();
}
export declare class Calendar extends Layout {
    public static dayTappedEvent: string;
    date: Date;
    multiple: boolean;
    selected: Date | Date[];
}
export declare class CalendarTitle extends Label {
}
export declare class CalendarAction extends Label {
    action: "previous" | "next";
}
export declare class CalendarDay extends Label {
} 