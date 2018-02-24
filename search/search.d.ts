import { ObservableArray } from "data/observable-array";

export interface SearchCallback {
    onClear();
    onCancel();
    onText(text: string);
    onSubmit(text: string);
}
export class SearchBar extends GridLayout {
    callbacks: SearchCallback[];
    register(c: SearchCallback);
    unregister(toDel: SearchCallback);
    cancel();
    clear();
    submit(text: string);
    changed(text: string);
    speech();
}
export class SearchBarModal extends View {
    hide();
    show();
    register(c: SearchCallback);
    unregister(toDel: SearchCallback);
    readonly opened: boolean;
    newPage: Page;
    results: ObservableArray<any>;
}

export class SearchField extends TextField {
    bar: SearchBar;
}
export class SearchIcon extends Label {
    position: "left" | "right";
    action: "submit" | "cancel" | "speech";
    bar: SearchBar;
} 