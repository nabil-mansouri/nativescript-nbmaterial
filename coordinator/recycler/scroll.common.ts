import { View, isAndroid } from 'ui/core/view';
import * as Rx from 'rxjs/Rx';
import { ScrollState, ScrollData, ScrollEvent, FixedHeaderBehaviorBase, ScaleBehaviorBase } from "../behaviours/scroll-base";
import { ProducerData, Producer, Behaviour } from "../behaviours/behaviour";
import { RecyclerProducer } from "./scroll";
import { RecyclerView, ItemEventData } from "nativescript-nbmaterial-recycler";

declare module "ui/core/view" {
    interface View {
        originalMarginTop: any;
    }
}
RecyclerView.prototype.scrollProducerRefCount = 0;

RecyclerView.prototype.createProducer = function (): Producer {
    if (!this.scrollProducer) {
        this.scrollProducer = new RecyclerProducer(this);
    }
    this.scrollProducerRefCount++;
    return this.scrollProducer;
};
RecyclerView.prototype.disposeProducer = function (): void {
    this.scrollProducerRefCount--;
    if (this.scrollProducerRefCount == 0) {
        this.scrollProducer = null;
    }
};
//1 PRODUCER 
//1 CONSUMER MOVE START => distinct => filter statePrevious=idle => debounce(160) => startMove(offset)
//1 CONSUMER MOVE => filter state!=idle => debounce(160) => canMove(direction) => move(direction,offset,lastOffset)
//1 CONSUMER MOVE END => distinct => filter state=idle => debounce(160) => if moveNotFinished() => finish(lastDirection)


export abstract class RecyclerProducerBase implements Producer {
    started = false;
    stream = new Rx.Subject<ScrollData>();
    constructor(protected view: RecyclerView) { }
    abstract startNative();
    abstract stopNative();
    init() { }
    start() {
        if (!this.started && this.view && this.view.recycler) {
            this.startNative();
            this.started = true;
        }
    }
    stop() {
        if (this.started && this.view && this.view.recycler) {
            this.stopNative();
            this.started = false;
        }
    }
}

export class FixedHeaderBehavior extends FixedHeaderBehaviorBase {
    callback;
    constructor(protected recycler: RecyclerView) {
        super(recycler.createProducer())
    }
    onLoaded() {
        super.onLoaded();
        this.callback = (data: ItemEventData) => {
            if (data.index == 0) {
                if (!data.view.originalMarginTop) {
                    data.view.originalMarginTop = data.view.marginTop;
                    data.view.marginTop = this.height;
                }
            } else if (data.view.originalMarginTop) {
                data.view.marginTop = data.view.originalMarginTop;
                delete data.view.originalMarginTop;
            }
        };
        this.recycler.on(RecyclerView.itemLoadingEvent, this.callback);
    }
    onDispose() {
        super.onDispose();
        this.recycler.disposeProducer();
        this.recycler.off(RecyclerView.itemLoadingEvent, this.callback);
    }
}

export class ScrollScaleBehavior extends ScaleBehaviorBase {
    constructor(private recycler: RecyclerView) {
        super(recycler.createProducer())
    }
    onDispose() {
        super.onDispose();
        this.recycler.disposeProducer();
    }
}