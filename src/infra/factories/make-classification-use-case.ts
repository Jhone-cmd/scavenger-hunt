import { ClassificationUseCase } from '@/domain/use-cases/classification'
import { PrismaPointRepository } from '../database/prisma/prisma-point-repository'

export function makeClassification() {
  const pointsRepository = new PrismaPointRepository()
  const classification = new ClassificationUseCase(pointsRepository)
  return classification
}
