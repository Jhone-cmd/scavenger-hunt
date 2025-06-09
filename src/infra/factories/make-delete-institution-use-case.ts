import { DeleteInstitutionUseCase } from '@/domain/use-cases/delete-institution'
import { PrismaInstitutionRepository } from '../database/prisma/prisma-institution-repository'

export function makeDeleteInstitutionUseCase() {
  const institutionRepository = new PrismaInstitutionRepository()
  const deleteInstitutionUSeCase = new DeleteInstitutionUseCase(
    institutionRepository
  )
  return deleteInstitutionUSeCase
}
