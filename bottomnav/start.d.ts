import { NavigationEntry } from "ui/frame";

export function startWithMenu(page: NavigationEntry, menu: string);


declare module "tns-core-modules/ui/frame" {
    interface Frame {
        hideRootMenu();
        showRootMenu();
        isRootMenuVisible(): boolean;
    }
    interface NavigationEntry {
        hideRootMenu?: boolean;
    }
}