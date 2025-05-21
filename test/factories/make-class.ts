import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Class, ClassProps } from '@/domain/entities/class'

export function makeClass(override: Partial<ClassProps>, id?: UniqueEntityId) {
  const classe = Class.create(
    {
      name: 'class-1',
      teacher: 'teacher-1',
      institutionId: new UniqueEntityId('institution-1'),
      ...override,
    },
    id
  )

  return classe
}
