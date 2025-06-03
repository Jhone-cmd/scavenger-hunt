import { Institution } from '../entities/institution'
import { InstitutionRepository } from '../repositories/institution-repository'

export interface FetchInstitutionsUseCaseRequest {
  page: number
}

export interface FetchInstitutionsUseCaseResponse {
  institutions: Institution[]
}

export class FetchInstitutionsUseCase {
  constructor(private institutionRepository: InstitutionRepository) {}

  async execute({
    page,
  }: FetchInstitutionsUseCaseRequest): Promise<FetchInstitutionsUseCaseResponse> {
    const institutions = await this.institutionRepository.findManyInstitutions({
      page,
    })

    return { institutions }
  }
}
