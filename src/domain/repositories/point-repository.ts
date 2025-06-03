import { PaginationParams } from '@/core/repositories/pagination-params'
import { Point } from '../entities/point'

export abstract class PointRepository {
  abstract create(point: Point): Promise<void>
  abstract classification(): Promise<
    { classeName: string; totalPoints: number }[]
  >
  abstract findManyPoints(params: PaginationParams): Promise<Point[]>
}
