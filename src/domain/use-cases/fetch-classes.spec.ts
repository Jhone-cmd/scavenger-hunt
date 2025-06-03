import { makeClass } from '../../../test/factories/make-class'
import { InMemoryClassRepository } from '../../../test/repositories/in-memory-class-repository'
import { FetchClassesUseCase } from './fetch-classes'

let inMemoryClassRepository: InMemoryClassRepository
let sut: FetchClassesUseCase

describe('Fetch Classes', () => {
  beforeEach(() => {
    inMemoryClassRepository = new InMemoryClassRepository()
    sut = new FetchClassesUseCase(inMemoryClassRepository)
  })

  it('should to be able fetch classes', async () => {
    inMemoryClassRepository.create(makeClass({}))
    inMemoryClassRepository.create(makeClass({}))

    await sut.execute({
      page: 1,
    })

    expect(inMemoryClassRepository.items).toHaveLength(2)
  })

  it('should to be able to fetch paginated order', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryClassRepository.create(makeClass({}))
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.classes).toHaveLength(2)
  })
})
