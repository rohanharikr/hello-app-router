"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggedIn = LoggedIn;
exports.LoggedOut = LoggedOut;
const auth_1 = require("./auth");
const isLoggedIn = () => { var _a; return ((_a = (0, auth_1.useAuth)()) === null || _a === void 0 ? void 0 : _a.isLoggedIn) || false; };
function LoggedIn({ children }) {
    if (isLoggedIn())
        return children;
}
function LoggedOut({ children }) {
    if (!isLoggedIn())
        return children;
}
