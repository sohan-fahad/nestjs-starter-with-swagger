import { toBool } from "./shared";

export const ENV_PRODUCTION = 'production';
export const ENV_DEVELOPMENT = 'development';

export const ENV = {
    port: process.env.PORT,
    env: process.env.NODE_ENV || ENV_DEVELOPMENT,
    isProduction: process.env.NODE_ENV === ENV_PRODUCTION,
    api: {
        API_PREFIX: process.env.API_PREFIX,
        API_VERSION: process.env.API_VERSION,
        API_TITLE: process.env.API_TITLE,
        API_DESCRIPTION: process.env.API_DESCRIPTION,
    },
    db: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,

        synchronize: toBool(process.env.DB_SYNCHRONIZE),
        logging: toBool(process.env.DB_LOGGING),
    },

}

export const ormConfig = {
    type: ENV.db.type,
    host: ENV.db.host,
    port: +ENV.db.port,
    username: ENV.db.username,
    password: ENV.db.password,
    database: ENV.db.database,
    synchronize: ENV.db.synchronize,
    logging: ENV.db.logging,
    autoLoadEntities: true,
};