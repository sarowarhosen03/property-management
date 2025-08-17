import dotenv from 'dotenv'
dotenv.config()

export const {
    DATABASE_URL,
    PORT = 3000,
    NODE_ENV = 'development',
    TOKEN_SECRET,
    TOKEN_EXPIRES_IN,
    DOMAIN,
    ADMIN_EMAIL,
    ADMIN_NAME,
    SMTP_HOST,
    SMTP_HOST_PORT,
    SMTP_HOST_USER,
    SMTP_HOST_PASSWORD,
    FRONT_END_APP_URL
} = process.env
