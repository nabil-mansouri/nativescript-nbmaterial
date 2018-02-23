import { CustomLayoutView, Property, View } from 'tns-core-modules/ui/core/view';
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { ProxyViewContainer } from 'tns-core-modules/ui/proxy-view-container';

export declare class PullToRefresh extends View {
    direction: "both" | "bottom" | "top";
    public static refreshTopEvent;
    public static refreshBottomEvent; 
    public androidBottomRefreshView: ActivityIndicator;
    startRefreshTop();
    startRefreshBottom();
    stopRefreshTop();
    stopRefreshBottom();
} 