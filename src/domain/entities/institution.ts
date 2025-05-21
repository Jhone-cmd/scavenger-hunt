import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface InstitutionProps {
  name: string
  responsible: string
  address: string
  phone: string
  createdAt: Date
  updatedAt?: Date
}

export class Institution extends Entity<InstitutionProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get responsible() {
    return this.props.responsible
  }

  set responsible(responsible: string) {
    this.props.responsible = responsible
    this.touch()
  }

  get address() {
    return this.props.address
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
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
    props: Optional<InstitutionProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const institution = new Institution(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id
    )

    return institution
  }
}
