import { makeInstitution } from '../../../test/factories/make-institution'
import { InMemoryInstitutionRepository } from '../../../test/repositories/in-memory-institution-repository'
import { FetchInstitutionsUseCase } from './fetch-institutions'

let inMemoryInstitutionRepository: InMemoryInstitutionRepository
let sut: FetchInstitutionsUseCase

describe('Fetch Institutions', () => {
  beforeEach(() => {
    inMemoryInstitutionRepository = new InMemoryInstitutionRepository()
    sut = new FetchInstitutionsUseCase(inMemoryInstitutionRepository)
  })

  it('should to be able fetch institutions', async () => {
    inMemoryInstitutionRepository.create(makeInstitution({}))
    inMemoryInstitutionRepository.create(makeInstitution({}))

    await sut.execute({
      page: 1,
    })

    expect(inMemoryInstitutionRepository.items).toHaveLength(2)
  })

  it('should to be able to fetch paginated order', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryInstitutionRepository.create(makeInstitution({}))
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.institutions).toHaveLength(2)
  })
})
