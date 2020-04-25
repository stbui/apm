const appData = require('../../package.json');

export const Config = {
    version: appData.version,
    name: appData.name,
    description: appData.description,
    uuid: process.env.APP_UUID,
    isProduction: process.env.NODE_ENV === 'production',
    salt: process.env.APP_SALT,
    session: {
        domain: process.env.APP_SESSION_DOMAIN,
        secret: process.env.APP_SESSION_SECRET || '123456',
        timeout: parseInt(process.env.APP_SESSION_TIMEOUT, 10),
    },
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    host: process.env.APP_HOST,
    database: {
        type: (process.env.APP_DATABASE_TYPE as any) || 'mongodb',
        host: process.env.APP_DATABASE_HOST || 'localhost',
        port: parseInt(process.env.APP_DATABASE_PORT, 10) || 27017,
        username: process.env.APP_DATABASE_USER,
        password: process.env.APP_DATABASE_PASSWORD,
        database: process.env.APP_DATABASE_NAME || 'apm',
        synchronize: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        logging: process.env.APP_DATABASE_LOGGING as any,
    },
    logger: {
        level: process.env.APP_LOGGER_LEVEL,
    },
    cache: {
        host: '127.0.0.1',
        port: 11211,
    },
    validator: {
        validationError: {
            target: false,
            value: false,
        },
    },
    email: {
        host: 'smtp.qq.com',
        secure: true,
        port: 465,
        auth: {
            user: '',
            pass: '',
        },
    },
    email_from: 'stbui@stbui.com',
};
