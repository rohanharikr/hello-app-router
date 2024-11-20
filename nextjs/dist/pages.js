"use strict";
// pages router
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagesAuth = exports.pageAuth = exports.getAuth = exports.getServerSideProps = void 0;
const cookie_1 = require("cookie");
//this import should be moved to app.ts file
const headers_1 = require("next/headers");
const api_1 = require("@hellocoop/api");
const url_1 = require("url");
const convertToHelloRequest = (req, res) => {
    var _a;
    return {
        headers: () => req.headers,
        query: req.query,
        path: req.url ? (_a = (0, url_1.parse)(req.url, true)) === null || _a === void 0 ? void 0 : _a.pathname : '/',
        getAuth: () => req.auth,
        setAuth: (auth) => { req.auth = auth; },
        method: req.method,
        body: req.body,
        frameWork: 'nextjs',
        loginSyncWrapper: (loginSync, params) => {
            return loginSync({ ...params, req, res });
        },
        logoutSyncWrapper: (logoutSync) => {
            return logoutSync({ req, res });
        },
    };
};
const convertToHelloResponse = (res) => {
    return {
        clearAuth: () => {
            const { name, value, options } = (0, api_1.clearAuthCookieParams)();
            res.setHeader('Set-Cookie', (0, cookie_1.serialize)(name, value, options));
        },
        send: (data) => res.send(data),
        json: (data) => res.json(data),
        redirect: (url) => res.redirect(url),
        setCookie: (name, value, options) => {
            res.setHeader('Set-Cookie', (0, cookie_1.serialize)(name, value, options));
        },
        setHeader: (name, value) => {
            if (Array.isArray(value)) {
                if (name.toLowerCase() === 'set-cookie') {
                    value.forEach(val => res.setHeader(name, val)); // Append each cookie individually
                }
                else {
                    res.setHeader(name, value.join(', ')); // Combine array values into a single string separated by commas
                }
            }
            else {
                res.setHeader(name, value);
            }
        },
        getHeaders: () => { throw (new Error('getHeaders not implemented')); }, // not implemented
        status: (statusCode) => {
            res.status(statusCode);
            return {
                send: (data) => res.send(data)
            };
        }
    };
};
const getServerSideProps = async function (context) {
    const req = context.req;
    const res = context.res;
    if (req.auth)
        return {
            props: { auth: req.auth }
        };
    const helloReq = convertToHelloRequest(req, res);
    const helloRes = convertToHelloResponse(context.res);
    const auth = await (0, api_1.getAuthfromCookies)(helloReq, helloRes);
    return {
        props: { auth }
    };
};
exports.getServerSideProps = getServerSideProps;
//this fn should be moved to app.ts file
const getAuth = async function () {
    const _headers = await (0, headers_1.headers)();
    const _cookies = await (0, headers_1.cookies)();
    // app router prohibits accessing the entire request object
    // only allows accessing headers and cookies
    const req = { ..._headers, ..._cookies };
    // tbd: we dont have access to the original req object in app router
    // fix ts complaint
    if (req.auth)
        return req.auth;
    const dummyResponse = {};
    // tbd: we dont have access to the original req object in app router
    // fix ts complaint
    const helloReq = convertToHelloRequest(req, dummyResponse);
    const auth = await (0, api_1.getAuthfromCookies)(helloReq);
    return auth;
};
exports.getAuth = getAuth;
const pageAuth = function (config) {
    if (!api_1.isConfigured) {
        (0, api_1.configure)(config);
    }
    const r = async (req, res) => {
        const helloReq = convertToHelloRequest(req, res);
        const helloRes = convertToHelloResponse(res);
        await (0, api_1.router)(helloReq, helloRes);
    };
    return r;
};
exports.pageAuth = pageAuth;
exports.pagesAuth = exports.pageAuth;
