import { Point } from '@/domain/entities/point'
import { PointRepository } from '@/domain/repositories/point-repository'

export class InMemoryPointRepository implements PointRepository {
  public items: Point[] = []

  async create(point: Point): Promise<void> {
    this.items.push(point)
  }
}
