import { View } from 'tns-core-modules/ui/core/view/view';
import * as Rx from 'rxjs/Rx';
import { ProducerData, Producer, Behaviour } from "../behaviours/behaviour";
import { ScrollData, ScrollDirection } from "../behaviours/scroll-base";
import { ScrollView } from "tns-core-modules/ui/scroll-view/scroll-view";


declare module "tns-core-modules/ui/scroll-view" {
    interface ScrollView {
        scrollProducerRefCount: number;
        scrollProducer: Producer;
        createProducer(): Producer;
        disposeProducer(): void;
    }
}
declare class ScrollProducer implements Producer {
    started: boolean;
    scrollListener;
    stream: Rx.Subject<ScrollData>;
    constructor(view: ScrollView);
    init();
    startNative();
    stopNative();
    start();
    stop();
}

declare class ExpandableHeaderBehavior implements Behaviour {
    view: View;
    height: number;
    deferHideFactor: number;
    deferShowFactor: number;
    animationDuration: number;
    hideDirection: ScrollDirection;
    producer: ScrollProducer;
    disappearAt: number;
    hideAnimation: (behav: ExpandableHeaderBehavior) => void;
    showAnimation: (behav: ExpandableHeaderBehavior) => void;
    constructor(recycler: ScrollView);
} 