import { BotyRestServer } from 'botyrest';
import { AnimalsModule } from '../modules/animals'

export const initilizeModules = ( server : BotyRestServer ) => {
  const animalsModule = new AnimalsModule( server )
}