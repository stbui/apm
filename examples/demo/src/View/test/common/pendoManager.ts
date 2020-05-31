angular
    .module('commonApp')
    .constant('API_KEY', '78c1a6d1-791d-4d7c-4ec7-5cfa38401c04')
    .factory('pendoManager', [
        'utils',
        'API_KEY',
        function (a, b) {
            function c(c) {
                window.pendo &&
                    a.isFunction(window.pendo.initialize) &&
                    window.pendo.initialize({
                        apiKey: b,
                        visitor: {
                            id: c.id,
                            email: c.email,
                            role: c.role,
                        },
                    });
            }
            return {
                initialize: c,
            };
        },
    ]);

export const pendoManager = { initialize: function (a?, b?) {} };
