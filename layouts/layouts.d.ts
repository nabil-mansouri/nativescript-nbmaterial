import { View } from "ui/core/view";
import { Page } from "ui/page";
import { BackstackEntry } from "ui/frame";
import { EventData } from "data/observable";

declare module "tns-core-modules/ui/page" {
    interface Page {
        statusBarTranslucent: boolean;
        setStatusBarTranslucent(translucent: boolean);
        getStatusBarHeightPx(): number;
        getStatusBarHeightDip(): number;
    }
}
declare module "tns-core-modules/ui/core/view" {
    interface View {
        addCssClass(cssClass: string);
        removeCssClass(cssClass: string);
        onAfterInitNative(callback: () => void);
        onBeforeDisposeNative(callback: () => void);
        onFirstLayout(callback: () => void);
        onNextLayout(callback: () => void);
    }
}

declare module "tns-core-modules/ui/frame" {
    export interface OnNavigateToEventData extends EventData {
        currentPage: Page;
        nextPage: Page;
        isBack: boolean;
        backStackEntry: BackstackEntry;
    }
    module Frame {
        export function onEveryNavigate(callback: (c: OnNavigateToEventData) => void, thisArg?: any);
        export function offEveryNavigate(callback: (c: OnNavigateToEventData) => void);
    }
}