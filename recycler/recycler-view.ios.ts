
import { View, KeyedTemplate, Property, Length, unsetValue, booleanConverter } from "ui/core/view";
import { ListView, ItemsSource } from "ui/list-view";
import { RecyclerViewBase, ItemEventData } from "./recycler-view.common";

//EXPORT ALL INCLUNDING KNOWNTEMPLATE
export * from "ui/list-view/list-view-common";



export class RecyclerView extends ListView {
    get recycler() { return this.nativeView; }



    setHeaderHeight(height: number) {
        throw "IOS HEADER HEIGHT NOT IMPLEMENTED";
    }
}
 