export const Share = {
    async share(options: ShareOptions): Promise<ShareResult> {
        return Promise.resolve({activityType: ''});
    }
};

export interface ShareOptions {
    title?: string;
    text?: string;
    url?: string;
    dialogTitle?: string;
}
export interface ShareResult {
    activityType?: string;
}