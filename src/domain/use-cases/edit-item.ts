import { ResourceNotFound } from '@/core/error/resource-not-found'
import { Item } from '../entities/item'
import { ItemRepository } from '../repositories/item-repository'

export interface EditItemUseCaseRequest {
  itemId: string
  name?: string
  points?: number
}

export interface EditItemUseCaseResponse {
  item: Item
}

export class EditItemUseCase {
  constructor(private itemRepository: ItemRepository) {}

  async execute({
    itemId,
    name,
    points,
  }: EditItemUseCaseRequest): Promise<EditItemUseCaseResponse> {
    const item = await this.itemRepository.findById(itemId)

    if (!item) {
      throw new ResourceNotFound()
    }

    item.name = name ? name : item.name
    item.points = points ? points : item.points

    await this.itemRepository.save(item)

    return { item }
  }
}
