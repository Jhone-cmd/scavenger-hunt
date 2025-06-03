import { Class } from '../entities/class'
import { ClassRepository } from '../repositories/class-repository'

export interface FetchClassesUseCaseRequest {
  page: number
}

export interface FetchClassesUseCaseResponse {
  classes: Class[]
}

export class FetchClassesUseCase {
  constructor(private classRepository: ClassRepository) {}

  async execute({
    page,
  }: FetchClassesUseCaseRequest): Promise<FetchClassesUseCaseResponse> {
    const classes = await this.classRepository.findManyClasses({ page })

    return { classes }
  }
}
