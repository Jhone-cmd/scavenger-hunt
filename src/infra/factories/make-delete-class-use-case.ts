import { DeleteClassUseCase } from '@/domain/use-cases/delete-class'
import { PrismaClassRepository } from '../database/prisma/prisma-class-repository'

export function makeDeleteClassUseCase() {
  const classRepository = new PrismaClassRepository()
  const deleteClassUSeCase = new DeleteClassUseCase(classRepository)
  return deleteClassUSeCase
}
