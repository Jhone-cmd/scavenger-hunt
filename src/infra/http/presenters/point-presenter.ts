import { Point } from '@/domain/entities/point'

export class PointPresenter {
  static toHttp(point: Point) {
    return {
      id: point.id.toString(),
      classe: point.classeName,
      item: point.itemName,
      amount: point.amount,
      total: point.total,
    }
  }
}
