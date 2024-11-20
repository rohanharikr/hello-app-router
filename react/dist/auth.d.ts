import type { Auth } from '@hellocoop/definitions';
export type AuthState = {
    auth: Auth | {};
    isLoading: boolean;
    isLoggedIn: boolean | undefined;
};
export declare const useAuth: () => AuthState;
//# sourceMappingURL=auth.d.ts.map