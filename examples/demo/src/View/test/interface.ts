export interface ILastRenderedActivity {
    playerIndex: number;
    time: number;
    data?: { visibilityState: 'hidden' };
    index?: number;
    timestamp?: number;
    type?: 'visibility_change' | 'childList';
}

export enum type {
    dom_snapshot = 'dom_snapshot',
}

export interface IActivity {
    data: object;
    index: number;
    time: number;
    timestamp: number;
    // type: 'dom_snapshot';
    type: string;
    // Activities.push
    playerIndex?: number;
}

export interface IRender {
    isTabHidden: boolean;
    lastRenderedActivity: IActivity;
    onTabHidden: (...a) => void;
    render: (b, d?) => void;
    reset: () => void;
    _onTabHiddenCallback: () => void;
}
