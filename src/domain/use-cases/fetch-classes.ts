import { Class } from '../entities/class'
import { ClassRepository } from '../repositories/class-repository'

export interface FetchClassesUseCaseRequest {
  institutionId: string
  page: number
}

export interface FetchClassesUseCaseResponse {
  classes: Class[]
}

export class FetchClassesUseCase {
  constructor(private classRepository: ClassRepository) {}

  async execute({
    institutionId,
    page,
  }: FetchClassesUseCaseRequest): Promise<FetchClassesUseCaseResponse> {
    const classes = await this.classRepository.findManyClasses(institutionId, {
      page,
    })

    return { classes }
  }
}
