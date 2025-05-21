import { UniqueEntityId } from '@/core/entities/unique-entity-id'
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
      throw new Error('Class already exists')
    }

    const classe = Class.create({
      name,
      teacher,
      institutionId: new UniqueEntityId(),
    })

    await this.classRepository.create(classe)

    return { classe }
  }
}
