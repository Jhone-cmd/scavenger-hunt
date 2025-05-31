import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceAlreadyExists } from '@/core/error/resource-already-exists'
import { Class } from '../entities/class'
import { ClassRepository } from '../repositories/class-repository'

export interface CreateClassUseCaseRequest {
  name: string
  teacher: string
  institutionId: string
}

export interface CreateClassUseCaseResponse {
  classe: Class
}

export class CreateClassUseCase {
  constructor(private classRepository: ClassRepository) {}

  async execute({
    name,
    teacher,
    institutionId,
  }: CreateClassUseCaseRequest): Promise<CreateClassUseCaseResponse> {
    const classWithSameName = await this.classRepository.findByName(name)

    if (classWithSameName) {
      throw new ResourceAlreadyExists()
    }

    const classe = Class.create({
      name,
      teacher,
      institutionId: new UniqueEntityId(institutionId),
    })

    await this.classRepository.create(classe)

    return { classe }
  }
}
