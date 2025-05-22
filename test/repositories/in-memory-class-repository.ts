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
}
