import { CreateInstitutionUseCase } from '@/domain/use-cases/create-institution'
import { PrismaInstitutionRepository } from '../database/prisma/prisma-institution-repository'

export function makeInstitutionUseCase() {
  const institutionRepository = new PrismaInstitutionRepository()
  const institutionUseCase = new CreateInstitutionUseCase(institutionRepository)
  return institutionUseCase
}
