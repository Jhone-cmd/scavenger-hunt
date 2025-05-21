import { Institution } from '../entities/institution'

export abstract class InstitutionRepository {
  abstract create(institution: Institution): Promise<void>
  abstract findByName(name: string): Promise<Institution | null>
}
