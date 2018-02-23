import { View } from 'ui/core/view';
import * as Rx from 'rxjs/Rx';
import { ProducerData, Producer, Behaviour } from "./behaviour";
import { ItemEventData } from "../../recycler";


declare module "../../recycler/recycler-view" {
    interface RecyclerView {
        scrollProducerRefCount: number;
        scrollProducer: Producer;
        createProducer(): Producer;
        disposeProducer(): void;
    }
}
declare class RecyclerProducer implements Producer {
    started: boolean;
    scrollListener;
    stream: Rx.Subject<ScrollData>;
    constructor(protected view: RecyclerView);
    startNative();
    stopNative();
    start();
    stop();
}

declare class FixedHeaderBehavior implements Behaviour {
    view: View;
    callback;
    height: number;
    playOpacity: boolean;
    speedFactor: number;
    deferHideFactor: number;
    deferShowFactor: number;
    animationDuration: number;
    maxTranslate: number;
    hideDirection: ScrollDirection;
    showWhenOffsetLessThanHeight: boolean;
    thresholdFactor: number;
    producer: RecyclerProducerBase;
    hideAnimation: (behav: FixedHeaderBehavior) => void;
    showAnimation: (behav: FixedHeaderBehavior) => void;
    constructor(private recycler: RecyclerView);
}
declare class ScrollScaleBehavior extends FixedHeaderBehavior { 
    constructor(private recycler: RecyclerView);
}