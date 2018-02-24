
import * as Rx from 'rxjs/Rx';
import { View } from "ui/core/view";

export interface Producer {
    init();
    start();
    stop();
    stream: Rx.Subject<ProducerData>;
}

export interface ProducerData {
    event: number;
}

export interface Behaviour {
    view: View;
    onCreate?();
    onInitNative?();
    onDispose?();
    onLoaded?();
    onUnloaded?();
}