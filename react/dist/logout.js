"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogOutRoute = void 0;
exports.logOut = logOut;
const provider_1 = require("./provider");
const makeLogoutRoute = (params) => {
    if (!params || !Object.keys(params).length)
        return provider_1.routeConfig.logout;
    const logoutRoute = new URL(provider_1.routeConfig.logout, "https://example.com"); // hack so we can use URL()
    for (let key in params) {
        logoutRoute.searchParams.set(key, params[key]);
    }
    return logoutRoute.pathname + logoutRoute.search;
};
const loginRoute = new URL(provider_1.routeConfig.login, "https://example.com"); // hack so we can use URL()
const getLogOutRoute = (params) => makeLogoutRoute(params);
exports.getLogOutRoute = getLogOutRoute;
function logOut(params) {
    if (typeof window !== 'undefined')
        window.location.href = makeLogoutRoute(params);
}
