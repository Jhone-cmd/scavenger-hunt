import { PaginationParams } from '@/core/repositories/pagination-params'
import { Class } from '@/domain/entities/class'
import { ClassRepository } from '@/domain/repositories/class-repository'

export class InMemoryClassRepository implements ClassRepository {
  public items: Class[] = []

  async create(classe: Class): Promise<void> {
    this.items.push(classe)
  }

  async findByName(name: string): Promise<Class | null> {
    const classe = this.items.find(item => item.name === name)

    if (!classe) return null

    return classe
  }

  async findById(id: string): Promise<Class | null> {
    const classe = this.items.find(item => item.id.toString() === id)

    if (!classe) return null

    return classe
  }

  async findManyClasses({ page }: PaginationParams): Promise<Class[]> {
    const perPage = 20
    const classes = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * perPage, page * perPage)

    return classes
  }

  async findManyClassesWithInstitutionId(
    institutionId: string,
    { page }: PaginationParams
  ): Promise<Class[]> {
    const perPage = 20
    const classes = this.items
      .filter(item => item.institutionId.toString() === institutionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * perPage, page * perPage)

    return classes
  }

  async save(classe: Class): Promise<void> {
    const classIndex = this.items.findIndex(item => item.id === classe.id)
    this.items[classIndex] = classe
  }

  async delete(classe: Class): Promise<void> {
    const classIndex = this.items.findIndex(item => item.id === classe.id)
    this.items.splice(classIndex, 1)
  }
}
