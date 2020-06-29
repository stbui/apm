export const $resource = (...args) => {
    return { get: {}, save: {} };
};

export const promise: any = {};

export const $window: any = window;
export const $document = [document];

export const $location = {
    search: () => {
        return [];
    },
};

export const $base64: any = {};
export const $cookies: any = {};
