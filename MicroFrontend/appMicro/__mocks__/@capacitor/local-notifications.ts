export const LocalNotifications = {
    async addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: any) => void): Promise<any> {
        return {}
    },
    async schedule(options: any): Promise<any> {
        return options;
    }
}

export interface ActionPerformed {
    actionId: string;
    inputValue?: string;
    notification: any;
}