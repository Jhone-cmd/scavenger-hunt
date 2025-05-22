import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface PointProps {
  itemId: UniqueEntityId
  classId: UniqueEntityId
  amount: number
  total: number
  createdAt: Date
  updatedAt?: Date
}

export class Point extends Entity<PointProps> {
  get itemId() {
    return this.props.itemId
  }

  get classId() {
    return this.props.classId
  }

  get total() {
    return this.props.total
  }

  set total(total: number) {
    this.props.total = total
    this.touch()
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

  static create(props: Optional<PointProps, 'createdAt'>, id?: UniqueEntityId) {
    const point = new Point(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )
    return point
  }
}
