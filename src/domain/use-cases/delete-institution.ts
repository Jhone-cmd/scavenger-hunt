import { ResourceNotFound } from '@/core/error/resource-not-found'
import { InstitutionRepository } from '../repositories/institution-repository'

export interface DeleteInstitutionUseCaseRequest {
  institutionId: string
}

type DeleteInstitutionUseCaseResponse = null | ResourceNotFound

export class DeleteInstitutionUseCase {
  constructor(private institutionRepository: InstitutionRepository) {}

  async execute({
    institutionId,
  }: DeleteInstitutionUseCaseRequest): Promise<DeleteInstitutionUseCaseResponse> {
    const institution = await this.institutionRepository.findById(institutionId)

    if (!institution) {
      throw new ResourceNotFound()
    }

    await this.institutionRepository.delete(institution)

    return null
  }
}
