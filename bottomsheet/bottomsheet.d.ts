import { View, Property, Template } from 'tns-core-modules/ui/core/view';
import { Page } from 'tns-core-modules/ui/page';
export declare const openProperty: Property<BottomSheetModalBase, boolean>;
export declare const contextProperty: Property<BottomSheetModalBase, any>;
export declare const templateProperty: Property<BottomSheetModalBase, View>;
export declare class BottomSheetModal extends View {
    static closeEvent: string;
    static showEvent: string;
    modalContext: {};
    constructor();
    open: boolean;
    autodrop:boolean;
    template: string | Template;
    hide(): void;
    show(): void;
    reset(): void;
    getOrCreatePage(): Page;
}
