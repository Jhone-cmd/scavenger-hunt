import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeClass } from '../../../test/factories/make-class'
import { makeInstitution } from '../../../test/factories/make-institution'
import { InMemoryClassRepository } from '../../../test/repositories/in-memory-class-repository'
import { InMemoryInstitutionRepository } from '../../../test/repositories/in-memory-institution-repository'
import { FetchClassesUseCase } from './fetch-classes'

let inMemoryInstitutionRepository: InMemoryInstitutionRepository
let inMemoryClassRepository: InMemoryClassRepository
let sut: FetchClassesUseCase

describe('Fetch Classes', () => {
  beforeEach(() => {
    inMemoryInstitutionRepository = new InMemoryInstitutionRepository()
    inMemoryClassRepository = new InMemoryClassRepository()
    sut = new FetchClassesUseCase(inMemoryClassRepository)
  })

  it('should to be able fetch classes', async () => {
    inMemoryInstitutionRepository.create(
      makeInstitution({}, new UniqueEntityId('institution-1'))
    )
    inMemoryClassRepository.create(
      makeClass({ institutionId: new UniqueEntityId('institution-1') })
    )
    inMemoryClassRepository.create(
      makeClass({ institutionId: new UniqueEntityId('institution-1') })
    )

    await sut.execute({
      institutionId: 'institution-1',
      page: 1,
    })

    expect(inMemoryClassRepository.items).toHaveLength(2)
  })

  it('should to be able to fetch paginated order', async () => {
    inMemoryInstitutionRepository.create(
      makeInstitution({}, new UniqueEntityId('institution-1'))
    )
    for (let i = 1; i <= 22; i++) {
      inMemoryClassRepository.create(
        makeClass({ institutionId: new UniqueEntityId('institution-1') })
      )
    }

    const result = await sut.execute({
      institutionId: 'institution-1',
      page: 2,
    })

    expect(result.classes).toHaveLength(2)
  })
})
