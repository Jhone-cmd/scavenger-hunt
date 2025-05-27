import { ResourceAlreadyExists } from '@/core/error/resource-already-exists'
import { InMemoryItemRepository } from '../../../test/repositories/in-memory-item-repository'
import { CreateItemUseCase } from './create-item'

let inMemoryItemRepository: InMemoryItemRepository
let sut: CreateItemUseCase

describe('Create Item', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository()
    sut = new CreateItemUseCase(inMemoryItemRepository)
  })

  it('should to be able create item', async () => {
    await sut.execute({
      name: 'item-1',
      points: 100,
    })

    expect(inMemoryItemRepository.items).toHaveLength(1)
    expect(inMemoryItemRepository.items[0]).toEqual(
      expect.objectContaining({ name: 'item-1' })
    )
  })

  it('should not to be able create item with same name', async () => {
    await sut.execute({
      name: 'item-1',
      points: 100,
    })
    await expect(
      sut.execute({
        name: 'item-1',
        points: 100,
      })
    ).rejects.toBeInstanceOf(ResourceAlreadyExists)
  })
})
