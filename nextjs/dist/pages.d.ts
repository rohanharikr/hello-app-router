import type { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next';
import { Auth } from '@hellocoop/definitions';
import { Config } from '@hellocoop/api';
declare module 'next' {
    interface NextApiRequest {
        auth?: Auth;
    }
}
export declare const getServerSideProps: (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<{
    auth: Auth;
}>>;
export declare const getAuth: () => Promise<Auth>;
export declare const pageAuth: (config: Config) => NextApiHandler;
export declare const pagesAuth: (config: Config) => NextApiHandler;
//# sourceMappingURL=pages.d.ts.map