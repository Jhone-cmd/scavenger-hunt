import { ResourceAlreadyExists } from '@/core/error/resource-already-exists'
import { Item } from '../entities/item'
import { ItemRepository } from '../repositories/item-repository'

export interface CreateItemUseCaseRequest {
  name: string
  points: number
}

export interface CreateItemUseCaseResponse {
  item: Item
}

export class CreateItemUseCase {
  constructor(private itemRepository: ItemRepository) {}

  async execute({
    name,
    points,
  }: CreateItemUseCaseRequest): Promise<CreateItemUseCaseResponse> {
    const itemWithSameName = await this.itemRepository.findByName(name)

    if (itemWithSameName) {
      throw new ResourceAlreadyExists()
    }
    const item = Item.create({
      name,
      points,
    })

    await this.itemRepository.create(item)

    return { item }
  }
}
