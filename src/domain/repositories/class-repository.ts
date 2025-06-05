import { PaginationParams } from '@/core/repositories/pagination-params'
import { Class } from '../entities/class'

export abstract class ClassRepository {
  abstract create(classe: Class): Promise<void>
  abstract findByName(name: string): Promise<Class | null>
  abstract findById(id: string): Promise<Class | null>
  abstract findManyClasses(params: PaginationParams): Promise<Class[]>
  abstract findManyClassesWithInstitutionId(
    institutionId: string,
    params: PaginationParams
  ): Promise<Class[]>
}
