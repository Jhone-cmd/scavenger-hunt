import { Item } from '../entities/item'
import { ItemRepository } from '../repositories/item-repository'

export interface FetchItemsUseCaseRequest {
  page: number
}

export interface FetchItemsUseCaseResponse {
  items: Item[]
}

export class FetchItemsUseCase {
  constructor(private itemRepository: ItemRepository) {}

  async execute({
    page,
  }: FetchItemsUseCaseRequest): Promise<FetchItemsUseCaseResponse> {
    const items = await this.itemRepository.findManyItems({ page })

    return { items }
  }
}
