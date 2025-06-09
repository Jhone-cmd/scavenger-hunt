import { EditClassUseCase } from '@/domain/use-cases/edit-class'
import { PrismaClassRepository } from '../database/prisma/prisma-class-repository'

export function makeEditClassUseCase() {
  const classRepository = new PrismaClassRepository()
  const editClassUseCase = new EditClassUseCase(classRepository)
  return editClassUseCase
}
