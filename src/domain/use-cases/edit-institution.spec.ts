import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeInstitution } from '../../../test/factories/make-institution'
import { InMemoryInstitutionRepository } from '../../../test/repositories/in-memory-institution-repository'
import { EditInstitutionUseCase } from './edit-institution'

let inMemoryInstitutionRepository: InMemoryInstitutionRepository
let sut: EditInstitutionUseCase

describe('Edit Institution', () => {
  beforeEach(() => {
    inMemoryInstitutionRepository = new InMemoryInstitutionRepository()
    sut = new EditInstitutionUseCase(inMemoryInstitutionRepository)
  })

  it('should to be able edit institution', async () => {
    const institution = makeInstitution({})
    inMemoryInstitutionRepository.items.push(institution)

    const institutionId = institution.id.toString()

    await sut.execute({
      institutionId,
      name: 'new institution',
    })

    expect(inMemoryInstitutionRepository.items[0].name).toEqual(
      'new institution'
    )
  })

  it('should not to be able edit institution not found', async () => {
    await expect(
      sut.execute({
        institutionId: '',
      })
    ).rejects.throw(ResourceNotFound)
  })
})
