import { FetchClassesUseCase } from '@/domain/use-cases/fetch-classes'
import { PrismaClassRepository } from '../database/prisma/prisma-class-repository'

export function makeFetchClassesUseCase() {
  const classRepository = new PrismaClassRepository()
  const fetchClassesUseCase = new FetchClassesUseCase(classRepository)
  return fetchClassesUseCase
}
