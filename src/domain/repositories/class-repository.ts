import { Class } from '../entities/class'

export abstract class ClassRepository {
  abstract create(classe: Class): Promise<void>
  abstract findByName(name: string): Promise<Class | null>
  abstract findById(id: string): Promise<Class | null>
}
