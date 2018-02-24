import { View, Size, isAndroid } from 'ui/core/view';
import { layout } from 'utils/utils';
import { StackLayout } from 'ui/layouts/stack-layout';
import { NavigatedData, Page } from 'ui/page';
import { AnimationCurve } from 'ui/enums';
import { GestureTypes, PanGestureEventData, GestureStateTypes } from 'ui/gestures';
import { ObservableArray } from 'data/observable-array';
import { Observable } from 'tns-core-modules/data/observable';
import * as Rx from 'rxjs/Rx';
import { Frame } from 'ui/frame';
import { RecyclerView, ItemEventData } from "nativescript-nbmaterial-recycler";
import { FixedHeaderBehavior, ScrollScaleBehavior } from "nativescript-nbmaterial-coordinator";
import { SearchCallback, SearchBar, SearchBarModal } from "nativescript-nbmaterial-searchbar";
import { PullToRefresh } from "nativescript-nbmaterial-pullrefresh";
import "../material/coordinator/coordinator";//AUGMENT VIEW


debugger;
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
export const searchAdapter: SearchCallback = {
    onCancel() {
        while (searchBar.results.length) {
            searchBar.results.pop();
        }
    },
    onClear() {
        while (searchBar.results.length) {
            searchBar.results.pop();
        }
    },
    onSubmit() {
        while (searchBar.results.length) {
            searchBar.results.pop();
        }
    },
    onText(text) {
        if (text && (text.startsWith("N") || text.startsWith("n"))) {
            for (let i = 0; i < 10; i++) {
                console.log("TEXT: ", text)
                searchBar.results.push({ label: text + " " + i })
            }
        } else {
            while (searchBar.results.length) {
                searchBar.results.pop();
            }
        }
    }
}
let page: Page = null;
let action: View = null;
let listView: RecyclerView = null;
let btn: View = null;
let searchBar: SearchBarModal = null;
let obj = new Observable();
let pullrefresh: PullToRefresh = null;
obj.set("icon", "add");
let array = new ObservableArray();
for (let i = 0; i < 50; i++) {
    let context = {
        text: "TEXT_" + i
    };
    array.push(context);
}
obj.set("source", array);
export function onNavigatingTo(args: NavigatedData) {
    page = <Page>args.object;
    console.log("NAVIGATING TO LISTS....", page)
    page.actionBarHidden = true;
    page.bindingContext = obj;
    listView = page.getViewById("list");
    action = page.getViewById("actionbar");
    btn = page.getViewById("floatbtn");
    searchBar = <any>page.getViewById("searchbar");
    searchBar.register(searchAdapter)
    pullrefresh = page.getViewById("pullrefresh")
    //
    pullrefresh.on(PullToRefresh.refreshBottomEvent, (e) => {
        console.log("REFRESH BOTTOM")
        setTimeout(() => {
            console.log("STOP REFRESH")
            let recycler = e.object;
            pullrefresh.stopRefreshBottom();
            array.push({
                text: "BOTTOM" + array.length
            })
        }, 1000)
    })
    pullrefresh.on(PullToRefresh.refreshTopEvent, (e) => {
        console.log("REFRESH TOP");
        setTimeout(() => {
            console.log("STOP REFRESH")
            let recycler = e.object;
            pullrefresh.stopRefreshTop();
            array.unshift({
                text: "TOP" + array.length,
            })
        }, 1000)
    })
    let behav = new FixedHeaderBehavior(listView);
    behav.height = 112;
    behav.speedFactor = 1;
    behav.deferHideFactor = 3;
    behav.deferShowFactor = 1;
    behav.playOpacity = false;
    behav.maxTranslate = 56;
    behav.thresholdFactor = 0.3;
    action.addBehaviour(behav);
    //
    let behavBtn = new ScrollScaleBehavior(listView);
    behavBtn.height = 56;
    behavBtn.deferHideFactor = 3;
    behavBtn.deferShowFactor = 1;
    btn.addBehaviour(behavBtn);
}
export function openSearch() {
    console.log("SEARBAR: ", searchBar)
    searchBar.show();
}
export function selectTabs(args) {
    console.log("SELECT TABS: ", args.forward, args.index)
}
export function lastItem() {
    console.log("LAST INDEX ");
}
export function tapItem(e) {
    console.log("ITEM TAP: ", e.index, e.view)
}

export function tapLongItem(e) {
    console.log("LONG TAP", e.index, e.view)
}
export function searchTap(e) {
    const selected = searchBar.results.getItem(e.index);
    console.log("SEARCH TAPED: ", e.eventName, selected.label);
}
export function templateSelector(item, index: number, items: any) {
    switch (index % 3) {
        case 0:
            return "zero";
        case 1:
            return "un";
        case 2:
            return "deux";
    }
    return 0;
}