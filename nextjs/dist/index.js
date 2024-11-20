"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.appAuth = exports.pagesAuth = exports.pageAuth = exports.getServerSideProps = exports.getAuth = void 0;
// pageAuth is synonym for pagesAuth
var pages_1 = require("./pages");
Object.defineProperty(exports, "getAuth", { enumerable: true, get: function () { return pages_1.getAuth; } });
Object.defineProperty(exports, "getServerSideProps", { enumerable: true, get: function () { return pages_1.getServerSideProps; } });
Object.defineProperty(exports, "pageAuth", { enumerable: true, get: function () { return pages_1.pageAuth; } });
Object.defineProperty(exports, "pagesAuth", { enumerable: true, get: function () { return pages_1.pagesAuth; } });
// app router functions
var app_1 = require("./app");
Object.defineProperty(exports, "appAuth", { enumerable: true, get: function () { return app_1.appAuth; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "auth", { enumerable: true, get: function () { return auth_1.auth; } });
__exportStar(require("@hellocoop/react"), exports);
