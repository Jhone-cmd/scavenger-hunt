import { FetchPointsUseCase } from '@/domain/use-cases/fetch-points'
import { PrismaPointRepository } from '../database/prisma/prisma-point-repository'

export function makeFetchPointsUseCase() {
  const pointsRepository = new PrismaPointRepository()
  const fetchPointsUseCase = new FetchPointsUseCase(pointsRepository)
  return fetchPointsUseCase
}
