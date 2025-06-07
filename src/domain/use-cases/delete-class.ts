import { ResourceNotFound } from '@/core/error/resource-not-found'
import { ClassRepository } from '../repositories/class-repository'

export interface DeleteClassUseCaseRequest {
  classId: string
}

type DeleteClassUseCaseResponse = null | ResourceNotFound

export class DeleteClassUseCase {
  constructor(private classRepository: ClassRepository) {}

  async execute({
    classId,
  }: DeleteClassUseCaseRequest): Promise<DeleteClassUseCaseResponse> {
    const classe = await this.classRepository.findById(classId)

    if (!classe) {
      throw new ResourceNotFound()
    }

    await this.classRepository.delete(classe)

    return null
  }
}
