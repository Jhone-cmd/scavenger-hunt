import { PaginationParams } from '@/core/repositories/pagination-params'
import { Institution } from '../entities/institution'

export abstract class InstitutionRepository {
  abstract create(institution: Institution): Promise<void>
  abstract findByName(name: string): Promise<Institution | null>
  abstract findManyInstitutions(
    params: PaginationParams
  ): Promise<Institution[]>
}
