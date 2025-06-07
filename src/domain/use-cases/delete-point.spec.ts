import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makePoint } from '../../../test/factories/make-point'
import { InMemoryClassRepository } from '../../../test/repositories/in-memory-class-repository'
import { InMemoryPointRepository } from '../../../test/repositories/in-memory-point-repository'
import { DeletePointUseCase } from './delete-point'

let inMemoryClassRepository: InMemoryClassRepository
let inMemoryPointRepository: InMemoryPointRepository
let sut: DeletePointUseCase

describe('Delete Point', () => {
  beforeEach(() => {
    inMemoryClassRepository = new InMemoryClassRepository()
    inMemoryPointRepository = new InMemoryPointRepository(
      inMemoryClassRepository
    )
    sut = new DeletePointUseCase(inMemoryPointRepository)
  })

  it('should to be able delete point', async () => {
    const point = makePoint({})
    inMemoryPointRepository.items.push(point)

    const pointId = point.id.toString()

    await sut.execute({
      pointId,
    })

    expect(inMemoryPointRepository.items).toHaveLength(0)
  })

  it('should not to be able delete point not found', async () => {
    await expect(
      sut.execute({
        pointId: '',
      })
    ).rejects.throw(ResourceNotFound)
  })
})
