import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeInstitution } from '../../../test/factories/make-institution'
import { InMemoryInstitutionRepository } from '../../../test/repositories/in-memory-institution-repository'
import { DeleteInstitutionUseCase } from './delete-institution'

let inMemoryInstitutionRepository: InMemoryInstitutionRepository
let sut: DeleteInstitutionUseCase

describe('Delete Institution', () => {
  beforeEach(() => {
    inMemoryInstitutionRepository = new InMemoryInstitutionRepository()
    sut = new DeleteInstitutionUseCase(inMemoryInstitutionRepository)
  })

  it('should to be able delete institution', async () => {
    const institution = makeInstitution({})
    inMemoryInstitutionRepository.items.push(institution)

    const institutionId = institution.id.toString()

    await sut.execute({
      institutionId,
    })

    expect(inMemoryInstitutionRepository.items).toHaveLength(0)
  })

  it('should not to be able delete institution not found', async () => {
    await expect(
      sut.execute({
        institutionId: '',
      })
    ).rejects.throw(ResourceNotFound)
  })
})
