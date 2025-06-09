import { DeletePointUseCase } from '@/domain/use-cases/delete-point'
import { PrismaPointRepository } from '../database/prisma/prisma-point-repository'

export function makeDeletePointUseCase() {
  const pointRepository = new PrismaPointRepository()
  const deletePointUSeCase = new DeletePointUseCase(pointRepository)
  return deletePointUSeCase
}
