import { PaginationParams } from '@/core/repositories/pagination-params'
import { Point } from '../entities/point'

export abstract class PointRepository {
  abstract create(point: Point): Promise<void>
  abstract findById(id: string): Promise<Point | null>
  abstract classification(): Promise<
    { classeName: string; totalPoints: number }[]
  >
  abstract findManyPoints(params: PaginationParams): Promise<Point[]>
  abstract save(point: Point): Promise<void>
  abstract delete(point: Point): Promise<void>
}
