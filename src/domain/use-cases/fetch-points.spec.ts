import { makePoint } from '../../../test/factories/make-point'
import { InMemoryClassRepository } from '../../../test/repositories/in-memory-class-repository'
import { InMemoryPointRepository } from '../../../test/repositories/in-memory-point-repository'
import { FetchPointsUseCase } from './fetch-points'

let inMemoryPointRepository: InMemoryPointRepository
let inMemoryClassRepository: InMemoryClassRepository
let sut: FetchPointsUseCase

describe('Fetch Points', () => {
  beforeEach(() => {
    inMemoryClassRepository = new InMemoryClassRepository()
    inMemoryPointRepository = new InMemoryPointRepository(
      inMemoryClassRepository
    )
    sut = new FetchPointsUseCase(inMemoryPointRepository)
  })

  it('should to be able fetch Points', async () => {
    inMemoryPointRepository.create(makePoint({}))
    inMemoryPointRepository.create(makePoint({}))

    await sut.execute({
      page: 1,
    })

    expect(inMemoryPointRepository.items).toHaveLength(2)
  })

  it('should to be able to fetch paginated order', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryPointRepository.create(makePoint({}))
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.points).toHaveLength(2)
  })
})
