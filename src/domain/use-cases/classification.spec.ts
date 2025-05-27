import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeClass } from '../../../test/factories/make-class'
import { makePoint } from '../../../test/factories/make-point'
import { InMemoryClassRepository } from '../../../test/repositories/in-memory-class-repository'
import { InMemoryItemRepository } from '../../../test/repositories/in-memory-item-repository'
import { InMemoryPointRepository } from '../../../test/repositories/in-memory-point-repository'
import { ClassificationUseCase } from './classification'

let inMemoryPointRepository: InMemoryPointRepository
let inMemoryItemRepository: InMemoryItemRepository
let inMemoryClassRepository: InMemoryClassRepository
let sut: ClassificationUseCase

describe('Classification', () => {
  beforeEach(() => {
    inMemoryClassRepository = new InMemoryClassRepository()
    inMemoryPointRepository = new InMemoryPointRepository(
      inMemoryClassRepository
    )
    inMemoryItemRepository = new InMemoryItemRepository()
    sut = new ClassificationUseCase(inMemoryPointRepository)
  })

  it('should be able to view a rating', async () => {
    const classe = makeClass({ name: 'alone' }, new UniqueEntityId('class-1'))
    inMemoryClassRepository.create(classe)

    const classId = classe.id
    inMemoryPointRepository.create(
      makePoint(
        {
          itemId: new UniqueEntityId('item-1'),
          classId,
          total: 150,
        },
        new UniqueEntityId('point-1')
      )
    )

    inMemoryPointRepository.create(
      makePoint(
        {
          itemId: new UniqueEntityId('item-2'),
          classId,
          total: 200,
        },
        new UniqueEntityId('point-2')
      )
    )

    const result = await sut.execute()

    expect(result.classification).toEqual([
      expect.objectContaining({ totalPoints: 350 }),
    ])
  })
})
