import { FetchInstitutionsUseCase } from '@/domain/use-cases/fetch-institutions'
import { PrismaInstitutionRepository } from '../database/prisma/prisma-institution-repository'

export function makeFetchInstitutionsUseCase() {
  const institutionRepository = new PrismaInstitutionRepository()
  const fetchInstitutionsUseCase = new FetchInstitutionsUseCase(
    institutionRepository
  )
  return fetchInstitutionsUseCase
}
