import dotenv from 'dotenv'
dotenv.config()

import { BotyRestServer, Logger } from 'botyrest'
import { getEnvironmentVariables } from './config'
import { AppDataSource } from './database'
import { initilizeModules } from './startup'

const server = new BotyRestServer({
  port: getEnvironmentVariables().port,
})

const logger = new Logger( 'app' )


AppDataSource.initialize().then( async () => {
  initilizeModules( server );
  await server.initializeServer();
} ).catch( error => logger.error( error ) )
