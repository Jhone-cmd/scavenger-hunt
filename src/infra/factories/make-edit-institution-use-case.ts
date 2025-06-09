import { EditInstitutionUseCase } from '@/domain/use-cases/edit-institution'
import { PrismaInstitutionRepository } from '../database/prisma/prisma-institution-repository'

export function makeEditInstitutionUseCase() {
  const institutionRepository = new PrismaInstitutionRepository()
  const editInstitutionUseCase = new EditInstitutionUseCase(
    institutionRepository
  )
  return editInstitutionUseCase
}
