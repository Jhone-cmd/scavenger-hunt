import { Point } from '../entities/point'
import { PointRepository } from '../repositories/point-repository'

export interface FetchPointsUseCaseRequest {
  page: number
}

export interface FetchPointsUseCaseResponse {
  points: Point[]
}

export class FetchPointsUseCase {
  constructor(private pointRepository: PointRepository) {}

  async execute({
    page,
  }: FetchPointsUseCaseRequest): Promise<FetchPointsUseCaseResponse> {
    const points = await this.pointRepository.findManyPoints({ page })

    return { points }
  }
}
