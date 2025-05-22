import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeClass } from '../../../test/factories/make-class'
import { makeItem } from '../../../test/factories/make-item'
import { InMemoryClassRepository } from '../../../test/repositories/in-memory-class-repository'
import { InMemoryItemRepository } from '../../../test/repositories/in-memory-item-repository'
import { InMemoryPointRepository } from '../../../test/repositories/in-memory-point-repository'
import { InsertionPointsUseCase } from './insertion-points'

let inMemoryPointRepository: InMemoryPointRepository
let inMemoryClassRepository: InMemoryClassRepository
let inMemoryItemRepository: InMemoryItemRepository
let sut: InsertionPointsUseCase

describe('Insertion Point', () => {
  beforeEach(() => {
    inMemoryPointRepository = new InMemoryPointRepository()
    inMemoryClassRepository = new InMemoryClassRepository()
    inMemoryItemRepository = new InMemoryItemRepository()
    sut = new InsertionPointsUseCase(
      inMemoryPointRepository,
      inMemoryClassRepository,
      inMemoryItemRepository
    )
  })

  it('should to be able insertion points', async () => {
    const classe = makeClass({}, new UniqueEntityId('class-1'))
    const item = makeItem({}, new UniqueEntityId('item-1'))

    inMemoryClassRepository.create(classe)
    inMemoryItemRepository.create(item)

    const classId = classe.id.toString()
    const itemId = item.id.toString()

    await sut.execute({
      classId,
      itemId,
      amount: 2,
    })

    expect(inMemoryPointRepository.items).toHaveLength(1)
    expect(inMemoryPointRepository.items[0]).toEqual(
      expect.objectContaining({ total: 400 })
    )
  })

  it('should not to  be able insertion points without an item or a class', async () => {
    const classe = makeClass({}, new UniqueEntityId('class-1'))

    const classId = classe.id.toString()

    await expect(
      sut.execute({
        classId,
        itemId: '',
        amount: 2,
      })
    ).rejects.toThrow('Resource not found')
  })
})
