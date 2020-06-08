import { utils } from './utils';
const API_KEY = '78c1a6d1-791d-4d7c-4ec7-5cfa38401c04';

function c(c) {
    window.pendo &&
        utils.isFunction(window.pendo.initialize) &&
        window.pendo.initialize({
            apiKey: API_KEY,
            visitor: {
                id: c.id,
                email: c.email,
                role: c.role,
            },
        });
}

export const pendoManager = { initialize: c };
