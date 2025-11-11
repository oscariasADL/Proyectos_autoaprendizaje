export const Clipboard = {
    async write(options: WriteOptions): Promise<void> {},
};

export interface WriteOptions {
    string?: string;
    image?: string;
    url?: string;
    label?: string;
}
