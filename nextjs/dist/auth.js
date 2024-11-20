"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const definitions_1 = require("@hellocoop/definitions");
const api_1 = require("@hellocoop/api");
const headers_1 = require("next/headers");
const helper_server_1 = require("@hellocoop/helper-server");
// TODO cache decryption
// import { unstable_cache } from 'next/cache';
// https://nextjs.org/docs/app/api-reference/functions/unstable_cache
const auth = async function () {
    var _a;
    const authCookie = (_a = (0, headers_1.cookies)().get(api_1.configuration.cookies.authName)) === null || _a === void 0 ? void 0 : _a.value;
    if (!authCookie)
        return definitions_1.NotLoggedIn;
    const a = await (0, helper_server_1.decryptObj)(authCookie, api_1.configuration.secret);
    if (!a)
        return definitions_1.NotLoggedIn;
    return a;
};
exports.auth = auth;
