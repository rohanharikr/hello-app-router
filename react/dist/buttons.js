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
exports.ContinueButton = ContinueButton;
exports.LoginButton = LoginButton;
exports.UpdateProfileButton = UpdateProfileButton;
const react_1 = __importStar(require("react"));
const definitions_1 = require("@hellocoop/definitions");
const provider_1 = require("./provider");
let checkedForStylesheet = false;
function BaseButton({ scope, update = false, targetURI, providerHint, label, style, color = "black", theme = "ignore-light", hover = "pop", showLoader = false, disabled = false, promptLogin = false, promptConsent = false, loginHint, domainHint }) {
    var _a;
    //check if dev has added Hellō stylesheet to pages with Hellō buttons
    if (typeof window != 'undefined' && !checkedForStylesheet) {
        const hasStylesheet = Array.from(document.head.getElementsByTagName('link')).find((element) => {
            var _a;
            return element.getAttribute('rel') === 'stylesheet' &&
                ((_a = element.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.startsWith(definitions_1.Button.STYLES_URL));
        });
        if (!hasStylesheet)
            console.warn('Could not find Hellō stylesheet. Please add to pages with Hellō buttons. See http://hello.dev/docs/buttons/#stylesheet for more info.');
        checkedForStylesheet = true;
    }
    const helloBtnClass = (_a = definitions_1.Button.CLASS_MAPPING[color]) === null || _a === void 0 ? void 0 : _a[theme];
    const [clicked, setClicked] = (0, react_1.useState)(false);
    const loginRoute = new URL(provider_1.routeConfig.login, "https://example.com"); // hack so we can use URL()
    if (scope) {
        if (typeof scope == 'string')
            loginRoute.searchParams.set("scope", scope);
        else
            loginRoute.searchParams.set("scope", scope.join(" "));
    }
    targetURI = targetURI || (typeof window != 'undefined' && window.location.pathname) || "";
    //window can be undefined when running server-side
    loginRoute.searchParams.set("target_uri", targetURI);
    if (update)
        loginRoute.searchParams.set("prompt", "consent");
    if (loginHint)
        loginRoute.searchParams.set("login_hint", loginHint);
    if (domainHint)
        loginRoute.searchParams.set("domain_hint", domainHint);
    if (providerHint) {
        if (typeof providerHint == 'string')
            loginRoute.searchParams.set("provider_hint", providerHint);
        else
            loginRoute.searchParams.set("provider_hint", providerHint.join(" "));
    }
    if (promptLogin && promptConsent) {
        loginRoute.searchParams.set("prompt", "login consent");
    }
    else if (promptLogin) {
        loginRoute.searchParams.set("prompt", "login");
    }
    else if (promptConsent) {
        loginRoute.searchParams.set("prompt", "consent");
    }
    const onClickHandler = () => {
        setClicked(true);
        if (typeof window !== 'undefined')
            window.location.href = loginRoute.pathname + loginRoute.search;
    };
    return (react_1.default.createElement("button", { onClick: onClickHandler, disabled: disabled || clicked, style: style, className: `hello-btn ${helloBtnClass} ${definitions_1.Button.HOVER_MAPPING[hover]} ${(showLoader || clicked) ? 'hello-btn-loader' : ''}` }, label));
}
function ContinueButton(props) {
    return react_1.default.createElement(BaseButton, { label: "\u014D\u00A0\u00A0\u00A0Continue with Hell\u014D", ...props });
}
function LoginButton(props) {
    return react_1.default.createElement(BaseButton, { label: "\u014D\u00A0\u00A0\u00A0Log in with Hell\u014D", ...props });
}
function UpdateProfileButton(props) {
    return react_1.default.createElement(BaseButton, { label: "\u014D\u00A0\u00A0\u00A0Update Profile with Hell\u014D", ...props, update: true });
}
