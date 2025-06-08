import { ResourceNotFound } from '@/core/error/resource-not-found'
import { Institution } from '../entities/institution'
import { InstitutionRepository } from '../repositories/institution-repository'

export interface EditInstitutionUseCaseRequest {
  institutionId: string
  name?: string
  responsible?: string
  address?: string
  phone?: string
}

export interface EditInstitutionUseCaseResponse {
  institution: Institution
}

export class EditInstitutionUseCase {
  constructor(private institutionRepository: InstitutionRepository) {}

  async execute({
    institutionId,
    name,
    responsible,
    address,
    phone,
  }: EditInstitutionUseCaseRequest): Promise<EditInstitutionUseCaseResponse> {
    const institution = await this.institutionRepository.findById(institutionId)

    if (!institution) {
      throw new ResourceNotFound()
    }

    institution.name = name ? name : institution.name
    institution.responsible = responsible
      ? responsible
      : institution.responsible
    institution.address = address ? address : institution.address
    institution.phone = phone ? phone : institution.phone

    await this.institutionRepository.save(institution)

    return { institution }
  }
}
