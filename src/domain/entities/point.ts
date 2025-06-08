import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface PointProps {
  classId: UniqueEntityId
  itemId: UniqueEntityId
  classeName?: string | null
  itemName?: string | null
  amount: number
  total: number
  createdAt: Date
  updatedAt?: Date
}

export class Point extends Entity<PointProps> {
  get classId() {
    return this.props.classId
  }

  get itemId() {
    return this.props.itemId
  }

  set itemId(itemId: UniqueEntityId) {
    this.props.itemId = itemId
    this.touch()
  }

  get classeName() {
    return this.props.classeName
  }

  get itemName() {
    return this.props.itemName
  }

  get amount() {
    return this.props.amount
  }

  set amount(amount: number) {
    this.props.amount = amount
    this.touch()
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

  static create(
    props: Optional<PointProps, 'createdAt' | 'total'>,
    id?: UniqueEntityId
  ) {
    const point = new Point(
      {
        ...props,
        total: props.total ?? 0,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )
    return point
  }
}
