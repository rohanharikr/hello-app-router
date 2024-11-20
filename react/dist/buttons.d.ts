import React from 'react';
import type { ProviderHint, Scope } from '@hellocoop/definitions';
import { Button } from '@hellocoop/definitions';
interface CommonButtonProps {
    label?: string;
    onClick?: any;
    style?: any;
    disabled?: boolean;
    showLoader?: boolean;
    color?: Button.Color;
    theme?: Button.Theme;
    hover?: Button.Hover;
    targetURI?: string;
    providerHint?: ProviderHint[] | string;
    promptLogin?: boolean;
    promptConsent?: boolean;
    loginHint?: string;
    domainHint?: string;
}
export interface BaseButtonProps extends CommonButtonProps {
    scope?: Scope[] | string;
    update?: boolean;
}
export interface LoginButtonProps extends CommonButtonProps {
    scope?: Scope[] | string;
}
export interface UpdateButtonProps extends CommonButtonProps {
    update?: boolean;
}
export declare function ContinueButton(props: LoginButtonProps): React.JSX.Element;
export declare function LoginButton(props: LoginButtonProps): React.JSX.Element;
export declare function UpdateProfileButton(props: UpdateButtonProps): React.JSX.Element;
export {};
//# sourceMappingURL=buttons.d.ts.map