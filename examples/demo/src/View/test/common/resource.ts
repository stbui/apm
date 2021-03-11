import { parse } from 'query-string';
import Cookies from 'js-cookie';

export const $resource = (...args) => {
    return { get: {}, save: {} };
};

export const promise: any = {};

export const $window: any = window;
export const $document = [document];

export const $location = {
    search: () => {
        // return [];
        return parse(window.location.search);
    },
};

export const $base64: any = {};
export const $cookies = {
    put: Cookies.set,
    get: Cookies.get,
    remove: Cookies.remove,
};
