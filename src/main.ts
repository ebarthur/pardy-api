import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import type {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from './utils/configs/config.interface'
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  })

  const configService = app.get(ConfigService)
  const nestConfig = configService.get<NestConfig>('nest')
  const corsConfig = configService.get<CorsConfig>('cors')
  const swaggerConfig = configService.get<SwaggerConfig>('swagger')

  // Swagger
  if (swaggerConfig?.enabled) {
    const config = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || 'The Nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup(swaggerConfig.path || 'api', app, document)
  }

  // Cors
  if (corsConfig?.enabled) {
    app.enableCors({
      origin: [corsConfig.origin || 'https://localhost:3000'],
      methods: corsConfig.methods,
      allowedHeaders: [corsConfig.allowedHeaders],
    })
  }

  //passport
  app.use(passport.initialize())

  await app.listen(process.env.PORT || nestConfig.port || 3000)
}
bootstrap()
