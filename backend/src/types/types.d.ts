declare namespace NodeJS{
    export interface ProcessEnv{
        DATABASE_URL: string,
        PORT: string,
        JWT_SECRET: string,
        GOOGLE_AUTH_CLIENT: string
    }
}


