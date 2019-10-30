# Nativescript implementation of the Material Calendar picker

The module implement Material calendar on both platforms iOS and Android.
The calendar implements slide transition effects.
The pager lets you change months using a swipe.

```typescript 
export function selectDate(e) {
    console.log("DATE SELECTED ", e.date, e.selected);
}  
```

```xml 
<Page xmlns="http://schemas.nativescript.org/tns.xsd"  xmlns:cal="nativescript-nbmaterial-calendar">
    <cal:CalendarMonthLayout dayTapped="selectDate" multiple="true"  >
        <cal:CalendarAction action="previous" text="chevron_left"/>
        <cal:CalendarTitle/>
        <cal:CalendarAction action="next" text="chevron_right"/>
    </cal:CalendarMonthLayout>
</Page>
```
multiple parameter lets you pick multiple date in the calendar.
CalendarTitle, CalendarAction extends labels. So you can use font library like font awesome.

The calendarmonthlayout has this interface:

```typescript
export declare class CalendarMonthLayout extends Layout {
    public static dayTappedEvent: string = "dayTapped";
    public static monthChangedEvent: string = "monthChanged";
    date: Date;
    multiple: boolean;
    selected: Date | Date[];
    next();
    previous();
}

export interface DayTappedEvent extends EventData {
    readonly tapped: Date;
    selected: Date | Date[];
    view: CalendarDay;
}
```

[See all modules here](https://github.com/nabil-mansouri/nativescript-nbmaterial)