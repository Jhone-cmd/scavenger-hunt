export interface Classification {
  classeName: string
  totalPoints: number
}

export class ClassificationPresenter {
  static toHttp(classification: Classification) {
    return {
      name: classification.classeName,
      total: classification.totalPoints,
    }
  }
}
