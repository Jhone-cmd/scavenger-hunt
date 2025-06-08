import { PaginationParams } from '@/core/repositories/pagination-params'
import { Institution } from '@/domain/entities/institution'
import { InstitutionRepository } from '@/domain/repositories/institution-repository'

export class InMemoryInstitutionRepository implements InstitutionRepository {
  public items: Institution[] = []

  async create(institution: Institution): Promise<void> {
    this.items.push(institution)
  }

  async findById(id: string): Promise<Institution | null> {
    const institution = this.items.find(item => item.id.toString() === id)

    if (!institution) return null

    return institution
  }

  async findByName(name: string): Promise<Institution | null> {
    const institution = this.items.find(item => item.name === name)

    if (!institution) return null

    return institution
  }

  async findManyInstitutions({
    page,
  }: PaginationParams): Promise<Institution[]> {
    const perPage = 20
    const institutions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * perPage, page * perPage)

    return institutions
  }

  async save(institution: Institution): Promise<void> {
    const institutionIndex = this.items.findIndex(
      item => item.id === institution.id
    )
    this.items[institutionIndex] = institution
  }

  async delete(institution: Institution): Promise<void> {
    const institutionIndex = this.items.findIndex(
      item => item.id === institution.id
    )
    this.items.splice(institutionIndex, 1)
  }
}
