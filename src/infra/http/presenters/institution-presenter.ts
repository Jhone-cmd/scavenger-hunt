import { Institution } from '@/domain/entities/institution'

export class InstitutionPresenter {
  static toHttp(institution: Institution) {
    return {
      id: institution.id.toString(),
      name: institution.name,
      responsible: institution.responsible,
      address: institution.address,
      phone: institution.phone,
    }
  }
}
