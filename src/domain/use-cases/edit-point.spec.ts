import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeItem } from '../../../test/factories/make-item'
import { makePoint } from '../../../test/factories/make-point'
import { InMemoryClassRepository } from '../../../test/repositories/in-memory-class-repository'
import { InMemoryItemRepository } from '../../../test/repositories/in-memory-item-repository'
import { InMemoryPointRepository } from '../../../test/repositories/in-memory-point-repository'
import { EditPointUseCase } from './edit-point'

let inMemoryItemRepository: InMemoryItemRepository

let inMemoryClassRepository: InMemoryClassRepository
let inMemoryPointRepository: InMemoryPointRepository
let sut: EditPointUseCase

describe('Edit Point', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository()
    inMemoryClassRepository = new InMemoryClassRepository()
    inMemoryPointRepository = new InMemoryPointRepository(
      inMemoryClassRepository
    )
    sut = new EditPointUseCase(inMemoryPointRepository, inMemoryItemRepository)
  })

  it('should to be able edit point', async () => {
    const item = makeItem({ points: 100 })
    inMemoryItemRepository.items.push(item)
    const point = makePoint({})
    inMemoryPointRepository.items.push(point)

    const pointId = point.id.toString()
    const itemId = item.id.toString()

    await sut.execute({
      pointId,
      itemId,
      amount: 3,
    })

    expect(inMemoryPointRepository.items[0].total).toEqual(300)
  })

  it('should not to be able edit point or itemId not found', async () => {
    await expect(
      sut.execute({
        pointId: '',
      })
    ).rejects.throw(ResourceNotFound)
  })
})
