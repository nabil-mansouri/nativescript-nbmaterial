import { Color } from 'tns-core-modules/ui/core/view';
import { AbsoluteLayout } from 'tns-core-modules/ui/layouts/absolute-layout';
import { EventData } from 'tns-core-modules/data/observable';
import { ListView, ItemEventData } from 'tns-core-modules/ui/list-view';
import { Label } from 'tns-core-modules/ui/label';
export { ItemEventData };

export declare class RecyclerView extends ListView { 
    public static itemLongTapEvent; 
    public recycler: any;
} 