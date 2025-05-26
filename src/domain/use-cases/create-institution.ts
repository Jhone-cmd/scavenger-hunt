import { ResourceAlreadyExists } from '@/core/error/resource-already-exists'
import { Institution } from '../entities/institution'
import { InstitutionRepository } from '../repositories/institution-repository'

export interface CreateInstitutionUseCaseRequest {
  name: string
  responsible: string
  address: string
  phone: string
}

export interface CreateInstitutionUseCaseResponse {
  institution: Institution
}

export class CreateInstitutionUseCase {
  constructor(private institutionRepository: InstitutionRepository) {}

  async execute({
    name,
    responsible,
    address,
    phone,
  }: CreateInstitutionUseCaseRequest): Promise<CreateInstitutionUseCaseResponse> {
    const institutionWithSameName =
      await this.institutionRepository.findByName(name)

    if (institutionWithSameName) {
      throw new ResourceAlreadyExists()
    }

    const institution = Institution.create({
      name,
      responsible,
      phone,
      address,
    })

    await this.institutionRepository.create(institution)

    return { institution }
  }
}
