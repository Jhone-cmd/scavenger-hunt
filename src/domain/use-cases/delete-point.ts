import { ResourceNotFound } from '@/core/error/resource-not-found'
import { PointRepository } from '../repositories/point-repository'

export interface DeletePointUseCaseRequest {
  pointId: string
}

type DeletePointUseCaseResponse = null | ResourceNotFound

export class DeletePointUseCase {
  constructor(private pointRepository: PointRepository) {}

  async execute({
    pointId,
  }: DeletePointUseCaseRequest): Promise<DeletePointUseCaseResponse> {
    const point = await this.pointRepository.findById(pointId)

    if (!point) {
      throw new ResourceNotFound()
    }

    await this.pointRepository.delete(point)

    return null
  }
}
