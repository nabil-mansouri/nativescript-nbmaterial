import * as Rx from 'rxjs/Rx';
import { ScrollState, ScrollData, ScrollEvent, ExpandableHeaderBehaviorBase } from "../behaviours/scroll-base";
import { ProducerData, Producer, Behaviour } from "../behaviours/behaviour";
import { ScrollProducer as ScrollProducerDef } from "./scroll";
import * as scrollview from "ui/scroll-view";
import { layout } from 'utils/utils';
import { View, isAndroid } from 'ui/core/view';

scrollview.ScrollView.prototype.scrollProducerRefCount = 0;

scrollview.ScrollView.prototype.createProducer = function (): Producer {
    if (!this.scrollProducer) {
        this.scrollProducer = new ScrollProducer(this);
    }
    this.scrollProducerRefCount++;
    return this.scrollProducer;
};
scrollview.ScrollView.prototype.disposeProducer = function (): void {
    this.scrollProducerRefCount--;
    if (this.scrollProducerRefCount == 0) {
        this.scrollProducer = null;
    }
};


export class ScrollProducer implements ScrollProducer {
    started = false;
    callback = null;
    stream = new Rx.Subject<ScrollData>();
    offsetX = 0;
    offsetY = 0;
    timeoutId = null;
    constructor(protected view: scrollview.ScrollView) { }
    init() { }
    /*sendIdle() {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.stream.next({
                dy: 0,
                dx: 0,
                event: ScrollEvent.StateChanged,
                offsetX: this.view.horizontalOffset,//DEJA EN DIP
                offsetY: this.view.verticalOffset,//DEJA EN DIP
                state: ScrollState.IDLE
            });
        }, 100)
    }*/
    start() {
        if (!this.started && this.view && this.view.nativeView) {
            this.callback = (e: scrollview.ScrollEventData) => {
                let dx = e.scrollX - this.offsetX;
                let dy = e.scrollY - this.offsetY;
                this.stream.next({
                    dy: dy,
                    dx: dx,
                    event: ScrollEvent.ScrollChanged,
                    offsetX: (e.scrollX),//DEJA EN DIP
                    offsetY: (e.scrollY),//DEJA EN DIP
                    state: ScrollState.TOUCHING
                });
                this.offsetX = e.scrollX;
                this.offsetY = e.scrollY;
            };
            this.view.on("scroll", this.callback);
            this.started = true;
        }
    }
    stop() {
        if (this.started && this.view && this.view.nativeView) {
            this.view.off("scroll", this.callback);
            this.started = false;
        }
    }
}

export class ExpandableHeaderBehavior extends ExpandableHeaderBehaviorBase {
    callback;
    constructor(protected scroll: scrollview.ScrollView) {
        super(scroll.createProducer())
    }
    onLoaded() {
        super.onLoaded();
    }
    onDispose() {
        super.onDispose();
        this.scroll.disposeProducer();
    }
}
