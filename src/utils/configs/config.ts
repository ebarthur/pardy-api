import type { Config } from './config.interface'

const config: Config = {
  nest: {
    port: 3000,
  },
  mail_service: {
    host: process.env.MAIL_HOST,
    port: Number.parseInt(process.env.MAIL_HOST),
    secure: Boolean(process.env.MAIL_SECURE),
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    credentials: {
      email: process.env.CREDENTIAL_EMAIL,
      name: process.env.CREDENTIAL_NAME,
    },
  },
  cors: {
    enabled: true,
    origin: process.env.WEB_DOMAIN,
    methods: ['GET', 'POST'],
    allowedHeaders: 'Content-Type, Authorization',
  },
  swagger: {
    enabled: true,
    title: 'Pardy | Event Platform API',
    description: '',
    version: '1.0',
    path: 'api',
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
    jwt_secret: process.env.JWT_SECRET,
  },
  project: {
    name: process.env.APP_NAME,
    address: process.env.APP_ADDRESS,
    logoUrl: process.env.LOGO_URL,
    slogan: process.env.SLOGAN,
    color: process.env.PRIMARY_COLOR || '#43297f',
    socials: JSON.parse(
      process.env.SOCIALS ||
        '[["GitHub","https://github.com/ebarthur"],["X","https://x.com/StatmanAartt"]]',
    ),
    url: process.env.BASE_URL || 'http://localhost:4200',
    mailVerificationUrl:
      process.env.MAIL_VERIFICATION_URL || 'http://localhost:3000/auth/verify',
    mailChangeUrl:
      process.env.MAIL_CHANGE_URL || 'http://localhost:3000/auth/change-email',
    resetPasswordUrl:
      process.env.RESET_PASSWORD_URL || 'http://localhost:4200/reset-password',
    termsOfServiceUrl:
      process.env.TERMS_OF_SERVICE_URL || 'http://localhost:4200/legal/terms',
  },
}

export default (): Config => config
