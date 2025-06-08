import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFound } from '@/core/error/resource-not-found'
import { Point } from '../entities/point'
import { ItemRepository } from '../repositories/item-repository'
import { PointRepository } from '../repositories/point-repository'

export interface EditPointUseCaseRequest {
  pointId: string
  itemId?: string
  amount?: number
}

export interface EditPointUseCaseResponse {
  point: Point
}

export class EditPointUseCase {
  constructor(
    private pointRepository: PointRepository,
    private itemRepository: ItemRepository
  ) {}

  async execute({
    pointId,
    itemId,
    amount,
  }: EditPointUseCaseRequest): Promise<EditPointUseCaseResponse> {
    let item = null
    const point = await this.pointRepository.findById(pointId)
    if (itemId) {
      item = await this.itemRepository.findById(itemId)
    }

    if (!point || !item) {
      throw new ResourceNotFound()
    }

    point.amount = amount ? amount : point.amount
    point.itemId = itemId ? new UniqueEntityId(itemId) : point.itemId
    point.total = item.points * point.amount

    await this.pointRepository.save(point)

    return { point }
  }
}
