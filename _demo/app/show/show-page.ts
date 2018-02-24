import { View, Size, isAndroid, Color } from 'ui/core/view';
import { layout } from 'utils/utils';
import { StackLayout } from 'ui/layouts/stack-layout';
import { NavigatedData, Page } from 'ui/page';
import { topmost } from 'ui/frame';
import { AnimationCurve } from 'ui/enums';
import { GestureTypes, PanGestureEventData, GestureStateTypes } from 'ui/gestures';
import { ObservableArray } from 'data/observable-array';
import { Observable } from 'tns-core-modules/data/observable';
import { ExpandableHeaderBehavior } from "nativescript-nbmaterial-coordinator";
import { ScrollView } from 'ui/scroll-view/scroll-view';

import * as Rx from 'rxjs/Rx';
import * as frame from 'ui/frame';


debugger;
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/

let page: Page = null;
let bottomSheet = null;
let scrollview: ScrollView;
let img_title: View;
let obj = new Observable();
obj.set("icon", "add");
let array = new ObservableArray();
for (let i = 0; i < 50; i++) {
    let context = {
        textInput: "TEXT : " + i,
        textInput2: ""
    };
    array.push(context);
}
obj.set("source", array);
export function onNavigatingTo(args: NavigatedData) {
    console.log("NAVIGATING TO....")
    page = <Page>args.object;
    page.actionBarHidden = true;
    page.bindingContext = obj;
    let appbar = <View>page.getViewById("actionbar");
    scrollview = page.getViewById("scrollview");
    img_title = page.getViewById("img_title");
    bottomSheet = page.getViewById("bottomsheet");
    //
    let behav = new ExpandableHeaderBehavior(scrollview);
    behav.height = 400;
    behav.disappearAt = 56 + page.getStatusBarHeightDip();
    behav.showAnimation = (ex) => {
        appbar.animate({ backgroundColor: new Color("transparent"), duration: ex.animationDuration, curve: AnimationCurve.easeOut });
    };
    behav.hideAnimation = (ex) => {
        appbar.animate({ backgroundColor: new Color("purple"), duration: ex.animationDuration, curve: AnimationCurve.easeIn });
    };
    img_title.addBehaviour(behav);
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