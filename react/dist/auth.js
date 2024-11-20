"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
const swr_1 = __importDefault(require("swr"));
const provider_1 = require("./provider");
const fetcher = async (url) => {
    try {
        const response = await fetch(url);
        const auth = await response.json();
        return auth;
    }
    catch (err) {
        console.error(err);
        return undefined;
    }
};
const useAuth = () => {
    const defaultAuth = (0, provider_1.useHelloProviderContext)();
    const { data: auth, isLoading } = (0, swr_1.default)(provider_1.routeConfig.auth, fetcher, {
        fallbackData: defaultAuth
    });
    return {
        auth: auth || {},
        isLoading,
        isLoggedIn: auth === null || auth === void 0 ? void 0 : auth.isLoggedIn
    };
};
exports.useAuth = useAuth;
