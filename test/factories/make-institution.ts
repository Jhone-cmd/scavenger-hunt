import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Institution, InstitutionProps } from '@/domain/entities/institution'

export function makeInstitution(
  override: Partial<InstitutionProps>,
  id?: UniqueEntityId
) {
  const institution = Institution.create(
    {
      name: 'institution-1',
      responsible: 'alone',
      address: 'Street Nothing',
      phone: '00 1234-5678',
      ...override,
    },
    id
  )
  return institution
}
