import { NextRequest, NextResponse } from 'next/server';
import { Auth } from '@hellocoop/definitions';
import { Config } from '@hellocoop/api';
declare module 'next/server' {
    interface NextRequest {
        auth?: Auth;
    }
}
type HandlerFunction = (req: NextRequest) => Promise<NextResponse>;
export declare const appAuth: (config: Config) => HandlerFunction;
export {};
//# sourceMappingURL=app.d.ts.map