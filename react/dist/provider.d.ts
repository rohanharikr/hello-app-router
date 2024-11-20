import React from 'react';
export type RouteConfig = {
    login: string;
    auth: string;
    logout: string;
};
export declare const routeConfig: RouteConfig;
declare const HelloProvider: ({ children, auth, config }: any) => React.JSX.Element;
declare const useHelloProviderContext: () => undefined;
export { HelloProvider, useHelloProviderContext };
//# sourceMappingURL=provider.d.ts.map