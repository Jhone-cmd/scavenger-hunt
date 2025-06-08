import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeItem } from '../../../test/factories/make-item'
import { InMemoryItemRepository } from '../../../test/repositories/in-memory-item-repository'
import { EditItemUseCase } from './edit-item'

let inMemoryItemRepository: InMemoryItemRepository
let sut: EditItemUseCase

describe('Edit Item', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository()
    sut = new EditItemUseCase(inMemoryItemRepository)
  })

  it('should to be able edit item', async () => {
    const item = makeItem({})
    inMemoryItemRepository.items.push(item)

    const itemId = item.id.toString()

    await sut.execute({
      itemId,
      name: 'new item',
    })

    expect(inMemoryItemRepository.items[0].name).toEqual('new item')
  })

  it('should not to be able edit item not found', async () => {
    await expect(
      sut.execute({
        itemId: '',
      })
    ).rejects.throw(ResourceNotFound)
  })
})
