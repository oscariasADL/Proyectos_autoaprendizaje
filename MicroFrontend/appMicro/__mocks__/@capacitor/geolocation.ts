import { PermissionState } from "@capacitor/core";

export const Geolocation = {
    async getCurrentPosition(options?: PositionOptions): Promise<Position> {
        return Promise.resolve({
            coords: {
                latitude: 4.719867,
                longitude: -74.1171746,
                accuracy: 19.726,
                altitudeAccuracy: null,
                altitude: null,
                speed: null,
                heading: null,
            },
            timestamp: 1653405360535,
        })
    },

    async checkPermissions(): Promise<PermissionStatus> {
        return Promise.resolve({
            location: 'prompt',
            coarseLocation: 'prompt'
        })
    }
}

export interface Position {
    timestamp: number;
    coords: {
        latitude: number;
        longitude: number;
        accuracy: number;
        altitudeAccuracy: number | null | undefined;
        altitude: number | null;
        speed: number | null;
        heading: number | null;
    };
}

export interface PermissionStatus {
    location: PermissionState;
    coarseLocation: PermissionState;
}