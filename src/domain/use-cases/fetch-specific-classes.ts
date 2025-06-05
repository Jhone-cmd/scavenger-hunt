import { Class } from '../entities/class'
import { ClassRepository } from '../repositories/class-repository'

export interface FetchSpecificClassesUseCaseRequest {
  institutionId: string
  page: number
}

export interface FetchSpecificClassesUseCaseResponse {
  classes: Class[]
}

export class FetchSpecificClassesUseCase {
  constructor(private classRepository: ClassRepository) {}

  async execute({
    institutionId,
    page,
  }: FetchSpecificClassesUseCaseRequest): Promise<FetchSpecificClassesUseCaseResponse> {
    const classes = await this.classRepository.findManyClassesWithInstitutionId(
      institutionId,
      {
        page,
      }
    )

    return { classes }
  }
}
