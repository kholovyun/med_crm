export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_PORT: string;
            CLIENT_ID: string;
            CLIENT_SECRET: string;
            REFRESH_TOKEN: string;
        }
    }
}
