import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeItem } from '../../../test/factories/make-item'
import { InMemoryItemRepository } from '../../../test/repositories/in-memory-item-repository'
import { DeleteItemUseCase } from './delete-item'

let inMemoryItemRepository: InMemoryItemRepository
let sut: DeleteItemUseCase

describe('Delete Item', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository()
    sut = new DeleteItemUseCase(inMemoryItemRepository)
  })

  it('should to be able delete item', async () => {
    const item = makeItem({})
    inMemoryItemRepository.items.push(item)

    const itemId = item.id.toString()

    await sut.execute({
      itemId,
    })

    expect(inMemoryItemRepository.items).toHaveLength(0)
  })

  it('should not to be able delete item not found', async () => {
    await expect(
      sut.execute({
        itemId: '',
      })
    ).rejects.throw(ResourceNotFound)
  })
})
