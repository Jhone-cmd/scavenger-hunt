import { ResourceNotFound } from '@/core/error/resource-not-found'
import { Class } from '../entities/class'
import { ClassRepository } from '../repositories/class-repository'

export interface EditClassUseCaseRequest {
  classId: string
  name?: string
  teacher?: string
}

export interface EditClassUseCaseResponse {
  classe: Class
}

export class EditClassUseCase {
  constructor(private classRepository: ClassRepository) {}

  async execute({
    classId,
    name,
    teacher,
  }: EditClassUseCaseRequest): Promise<EditClassUseCaseResponse> {
    const classe = await this.classRepository.findById(classId)

    if (!classe) {
      throw new ResourceNotFound()
    }

    classe.name = name ? name : classe.name
    classe.teacher = teacher ? teacher : classe.teacher

    await this.classRepository.save(classe)

    return { classe }
  }
}
