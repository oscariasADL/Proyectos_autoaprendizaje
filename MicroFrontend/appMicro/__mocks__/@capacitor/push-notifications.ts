export const PushNotifications = {
    async addListener(eventName: string, listenerFunc: (notificationAction: any) => void): Promise<any> {
        return {}
    },
    async requestPermissions(): Promise<any> {
        return {}
    },
    async register(): Promise<void> {}
}

export interface ActionPerformed {
    actionId: string;
    inputValue?: string;
    notification: any;
}

export interface PushNotificationSchema {
    title?: string;
    subtitle?: string;
    body?: string;
    id: string;
    badge?: number;
    notification?: any;
    data: any;
    click_action?: string;
    link?: string;
    group?: string;
    groupSummary?: boolean;
}

export interface Token {
    value: string;
}