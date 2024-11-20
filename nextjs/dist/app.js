"use strict";
// app router
Object.defineProperty(exports, "__esModule", { value: true });
exports.appAuth = void 0;
const cookie_1 = require("cookie");
const server_1 = require("next/server");
const api_1 = require("@hellocoop/api");
function headersToObject(headers) {
    const object = {};
    headers.forEach((value, key) => {
        object[key] = value;
    });
    return object;
}
function urlSearchParamsToObject(params) {
    const obj = {};
    params.forEach((value, key) => {
        if (Array.isArray(value)) {
            obj[key] = value[0];
        }
        else if (typeof value === 'string') {
            obj[key] = value;
        }
    });
    return obj;
}
const convertToHelloRequest = (req, res) => {
    return {
        headers: () => { return headersToObject(req.headers); },
        query: urlSearchParamsToObject(req.nextUrl.searchParams),
        path: req.nextUrl.pathname,
        getAuth: () => req.auth,
        setAuth: (auth) => { req.auth = auth; },
        method: req.method,
        body: req.body,
        loginSyncWrapper: (loginSync, params) => {
            return loginSync({ ...params, req, res });
        },
        logoutSyncWrapper: (logoutSync) => {
            return logoutSync({ req, res });
        },
        frameWork: 'nextjs',
    };
};
const convertToHelloResponse = (res) => {
    return {
        clearAuth: () => {
            const { name, value, options } = (0, api_1.clearAuthCookieParams)();
            res.headers.append('Set-Cookie', (0, cookie_1.serialize)(name, value, options));
        },
        send: (data) => {
            res.body = data;
            res.headers.set('Content-Type', 'text/html');
        },
        json: (json) => res.json = json,
        redirect: (url) => res.redirect = url,
        setCookie: (name, value, options) => {
            res.headers.append('Set-Cookie', (0, cookie_1.serialize)(name, value, options));
        },
        getHeaders: () => headersToObject(res.headers),
        setHeader: (name, value) => {
            if (Array.isArray(value)) {
                res.headers.set(name, value.join(', '));
            }
            else {
                res.headers.set(name, value);
            }
        },
        status: (statusCode) => {
            res.status = statusCode;
            return {
                send: (data) => {
                    res.body = data;
                    res.headers.set('Content-Type', 'text/html');
                }
            };
        },
    };
};
const appAuth = (config) => {
    if (!api_1.isConfigured) {
        (0, api_1.configure)(config);
    }
    const r = async (req) => {
        const internalResponse = {
            status: 200,
            headers: new Headers(),
        };
        const helloReq = convertToHelloRequest(req, internalResponse);
        const helloRes = convertToHelloResponse(internalResponse);
        await (0, api_1.router)(helloReq, helloRes);
        if (internalResponse.redirect)
            return server_1.NextResponse.redirect(new URL(internalResponse.redirect, req.url), { headers: internalResponse.headers });
        if (internalResponse.json)
            return server_1.NextResponse.json(internalResponse.json, { headers: internalResponse.headers });
        const res = new server_1.NextResponse(internalResponse.body, {
            status: internalResponse.status,
            headers: internalResponse.headers
        });
        return res;
    };
    return r;
};
exports.appAuth = appAuth;
