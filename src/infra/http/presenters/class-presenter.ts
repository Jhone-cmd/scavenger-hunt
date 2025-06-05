import { Class } from '@/domain/entities/class'

export class ClassPresenter {
  static toHttp(classe: Class) {
    return {
      id: classe.id.toString(),
      institution: classe.institutionName,
      name: classe.name,
      teacher: classe.teacher,
    }
  }
}
