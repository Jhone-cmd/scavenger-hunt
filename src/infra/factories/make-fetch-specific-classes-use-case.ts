import { FetchSpecificClassesUseCase } from '@/domain/use-cases/fetch-specific-classes'
import { PrismaClassRepository } from '../database/prisma/prisma-class-repository'

export function makeFetchSpecificClassesUseCase() {
  const classRepository = new PrismaClassRepository()
  const fetchSpecificClassesUseCase = new FetchSpecificClassesUseCase(
    classRepository
  )
  return fetchSpecificClassesUseCase
}
