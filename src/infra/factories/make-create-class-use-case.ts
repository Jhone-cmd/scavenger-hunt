import { CreateClassUseCase } from '@/domain/use-cases/create-class'
import { PrismaClassRepository } from '../database/prisma/prisma-class-repository'

export function makeCreateClassUseCase() {
  const classRepository = new PrismaClassRepository()
  const createClassUseCase = new CreateClassUseCase(classRepository)
  return createClassUseCase
}
