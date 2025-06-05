import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ClassProps {
  name: string
  teacher: string
  institutionId: UniqueEntityId
  institutionName?: string | null
  createdAt: Date
  updatedAt?: Date
}

export class Class extends Entity<ClassProps> {
  get name() {
    return this.props.name
  }

  get teacher() {
    return this.props.teacher
  }

  set teacher(teacher: string) {
    this.props.teacher = teacher
    this.touch()
  }

  get institutionId() {
    return this.props.institutionId
  }

  get institutionName() {
    return this.props.institutionName
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<ClassProps, 'createdAt'>, id?: UniqueEntityId) {
    const classe = new Class(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id
    )

    return classe
  }
}
