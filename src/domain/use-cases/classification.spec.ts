import { UniqueEntityId } from '@/core/entities/unique-entity-id'
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
    inMemoryPointRepository.create(
      makePoint(
        {
          itemId: new UniqueEntityId('item-1'),
          classId: new UniqueEntityId('class-1'),
          total: 150,
        },
        new UniqueEntityId('point-1')
      )
    )

    inMemoryPointRepository.create(
      makePoint(
        {
          itemId: new UniqueEntityId('item-2'),
          classId: new UniqueEntityId('class-1'),
          total: 200,
        },
        new UniqueEntityId('point-2')
      )
    )

    inMemoryPointRepository.create(
      makePoint(
        {
          itemId: new UniqueEntityId('item-1'),
          classId: new UniqueEntityId('class-1'),
          total: 150,
        },
        new UniqueEntityId('point-1')
      )
    )

    inMemoryPointRepository.create(
      makePoint(
        {
          itemId: new UniqueEntityId('item-2'),
          classId: new UniqueEntityId('class-1'),
          total: 200,
        },
        new UniqueEntityId('point-2')
      )
    )

    inMemoryPointRepository.create(
      makePoint(
        {
          itemId: new UniqueEntityId('item-3'),
          classId: new UniqueEntityId('class-2'),
          total: 150,
        },
        new UniqueEntityId('point-3')
      )
    )

    inMemoryPointRepository.create(
      makePoint(
        {
          itemId: new UniqueEntityId('item-4'),
          classId: new UniqueEntityId('class-2'),
          total: 200,
        },
        new UniqueEntityId('point-4')
      )
    )

    const result = await sut.execute()

    console.log(result)
  })
})
