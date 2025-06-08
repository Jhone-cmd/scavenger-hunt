import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ItemProps {
  name: string
  points: number
  createdAt: Date
  updatedAt?: Date
}

export class Item extends Entity<ItemProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get points() {
    return this.props.points
  }

  set points(points: number) {
    this.props.points = points
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

  static create(props: Optional<ItemProps, 'createdAt'>, id?: UniqueEntityId) {
    const item = new Item(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id
    )

    return item
  }
}
