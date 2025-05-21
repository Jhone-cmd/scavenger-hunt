import { Institution } from '@/domain/entities/institution'
import { InstitutionRepository } from '@/domain/repositories/institution-repository'

export class InMemoryInstitutionRepository implements InstitutionRepository {
  public items: Institution[] = []

  async create(institution: Institution): Promise<void> {
    this.items.push(institution)
  }

  async findByName(name: string): Promise<Institution | null> {
    const institution = this.items.find(item => item.name === name)

    if (!institution) return null

    return institution
  }
}
