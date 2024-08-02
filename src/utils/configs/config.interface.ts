export interface Config {
  nest: NestConfig
  cors: CorsConfig
  swagger: SwaggerConfig
  security: SecurityConfig
  mail_service: MailServiceConfig
  project: ProjectConfig
}

export interface NestConfig {
  port: number
}

export interface CorsConfig {
  enabled: boolean
  origin: string
  methods: string[]
  allowedHeaders: string
}

export interface SwaggerConfig {
  enabled: boolean
  title: string
  description: string
  version: string
  path: string
}

export interface SecurityConfig {
  expiresIn: string
  refreshIn: string
  bcryptSaltOrRound: string | number
  jwt_secret: string
}

export interface MailServiceConfig {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
  credentials: MailCredentialsConfig
}

export interface MailCredentialsConfig {
  name: string
  email: string
}

export interface ProjectConfig {
  name: string
  address: string
  logoUrl: string
  slogan: string
  color: string
  socials: [string, string][]
  url: string
  mailVerificationUrl: string
  mailChangeUrl: string
  resetPasswordUrl: string
  termsOfServiceUrl: string
}
