import { Repository } from 'typeorm';
import { AppDataSource } from '../../database';
import { Animals } from './animals.entity';
import { CreateAnimalsDto, UpdateAnimalsDto } from './dtos';

export class AnimalsService {
  private readonly animalsRepository : Repository<Animals> = AppDataSource.getRepository( Animals )

  constructor () {}
  
  async findAll () {
    const animals = await this.animalsRepository.find()
    return animals
  }

  async findOne ( term : string ) {
    const animals = await this.animalsRepository.findOneBy({ id: term })
    return animals
  }

  async create ( createAnimalsDto : CreateAnimalsDto ) {
    const animals = this.animalsRepository.create( createAnimalsDto )
    return await this.animalsRepository.save( animals )
  }

  async update ( id : string, updateAnimalsDto : UpdateAnimalsDto ) {
    const animalsToUpdate = await this.animalsRepository.preload({
      id,
      ...updateAnimalsDto
    })

    if ( !animalsToUpdate ) return

    await this.animalsRepository.save( animalsToUpdate )
    return animalsToUpdate
  }

  async delete ( id : string ) {
    const animalsToDelete = await this.findOne( id )
    if ( !animalsToDelete ) return
    return await this.animalsRepository.delete( id )
  }
}
