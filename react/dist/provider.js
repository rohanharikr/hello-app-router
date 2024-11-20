"use client";
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHelloProviderContext = exports.HelloProvider = exports.routeConfig = void 0;
const react_1 = __importStar(require("react"));
exports.routeConfig = {
    login: '/api/hellocoop?op=login',
    auth: '/api/hellocoop?op=auth',
    logout: '/api/hellocoop?op=logout',
};
const HelloContext = (0, react_1.createContext)(undefined);
const HelloProvider = ({ children, auth, config }) => {
    if (config === null || config === void 0 ? void 0 : config.login)
        exports.routeConfig.login = config.login;
    if (config === null || config === void 0 ? void 0 : config.auth)
        exports.routeConfig.auth = config.auth;
    if (config === null || config === void 0 ? void 0 : config.logout)
        exports.routeConfig.logout = config.logout;
    return (react_1.default.createElement(HelloContext.Provider, { value: auth }, children));
};
exports.HelloProvider = HelloProvider;
const useHelloProviderContext = () => {
    return (0, react_1.useContext)(HelloContext);
};
exports.useHelloProviderContext = useHelloProviderContext;
