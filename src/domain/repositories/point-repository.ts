import { Point } from '../entities/point'

export abstract class PointRepository {
  abstract create(point: Point): Promise<void>
}
