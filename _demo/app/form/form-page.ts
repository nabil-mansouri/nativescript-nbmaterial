import { View, Size, isAndroid } from 'ui/core/view';
import { layout } from 'utils/utils';
import { StackLayout } from 'ui/layouts/stack-layout';
import { NavigatedData, Page } from 'ui/page';
import { AnimationCurve } from 'ui/enums';
import { GestureTypes, PanGestureEventData, GestureStateTypes } from 'ui/gestures';
import { ObservableArray } from 'data/observable-array';
import { Observable } from 'tns-core-modules/data/observable';
import * as Rx from 'rxjs/Rx';
import * as frame from 'ui/frame';
import "nativescript-nbmaterial-coordinator/text-input";

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/

let page: Page = null;
let bottomSheet = null;
let obj = new Observable();
obj.set("icon", "add");
obj.set("textInput", "TEXT1");
obj.set("textInput1", "");
obj.set("textInput2", "TEXT2");
obj.set("textInput3", "");
obj.set("textInput4", "");
export function onNavigatingTo(args: NavigatedData) {
    console.log("NAVIGATING TO....")
    page = <Page>args.object;
    page.actionBarHidden = true;
    page.bindingContext = obj;
    bottomSheet = page.getViewById("bottomsheet");
}
export function showBS() {
    console.log("TAPZPED");
    bottomSheet.show();
}
export function hideBS() {
    bottomSheet.hide();
}
export function lastItem() {
    console.log("LAST INDEX ");
}
export function selectDate(e) {
    console.log("DATE SELECTED ", e.date, e.selected);
}   