import { PointRepository } from '../repositories/point-repository'

export interface ClassificationUseCaseResponse {
  classification: { classeName: string; totalPoints: number }[]
}

export class ClassificationUseCase {
  constructor(private pointRepository: PointRepository) {}

  async execute(): Promise<ClassificationUseCaseResponse> {
    const classification = await this.pointRepository.classification()

    return { classification }
  }
}
