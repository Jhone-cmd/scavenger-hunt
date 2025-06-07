import { ResourceNotFound } from '@/core/error/resource-not-found'
import { ItemRepository } from '../repositories/item-repository'

export interface DeleteItemUseCaseRequest {
  itemId: string
}

type DeleteItemUseCaseResponse = null | ResourceNotFound

export class DeleteItemUseCase {
  constructor(private itemRepository: ItemRepository) {}

  async execute({
    itemId,
  }: DeleteItemUseCaseRequest): Promise<DeleteItemUseCaseResponse> {
    const item = await this.itemRepository.findById(itemId)

    if (!item) {
      throw new ResourceNotFound()
    }

    await this.itemRepository.delete(item)

    return null
  }
}
