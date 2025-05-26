import { ResourceNotFound } from '@/core/error/resource-not-found'
import { Point } from '../entities/point'
import { ClassRepository } from '../repositories/class-repository'
import { ItemRepository } from '../repositories/item-repository'
import { PointRepository } from '../repositories/point-repository'

export interface InsertionPointsUseCaseRequest {
  itemId: string
  classId: string
  amount: number
}

export interface InsertionPointsUseCaseResponse {
  point: Point
}

export class InsertionPointsUseCase {
  constructor(
    private pointRepository: PointRepository,
    private classRepository: ClassRepository,
    private itemRepository: ItemRepository
  ) {}

  async execute({
    itemId,
    classId,
    amount,
  }: InsertionPointsUseCaseRequest): Promise<InsertionPointsUseCaseResponse> {
    const classe = await this.classRepository.findById(classId)
    const item = await this.itemRepository.findById(itemId)

    if (!item || !classe) {
      throw new ResourceNotFound()
    }

    const point = Point.create({
      classId: classe.id,
      itemId: item.id,
      amount,
      total: item.points * amount,
    })

    await this.pointRepository.create(point)

    return { point }
  }
}
