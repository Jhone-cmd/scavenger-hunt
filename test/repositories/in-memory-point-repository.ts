import { PaginationParams } from '@/core/repositories/pagination-params'
import { Point } from '@/domain/entities/point'
import { PointRepository } from '@/domain/repositories/point-repository'
import { InMemoryClassRepository } from './in-memory-class-repository'

export class InMemoryPointRepository implements PointRepository {
  public items: Point[] = []

  constructor(private classRepository: InMemoryClassRepository) {}

  async create(point: Point): Promise<void> {
    this.items.push(point)
  }

  async findById(id: string): Promise<Point | null> {
    const point = this.items.find(item => item.id.toString() === id)

    if (!point) return null

    return point
  }

  async classification(): Promise<
    { classeName: string; totalPoints: number }[]
  > {
    const classeNames: { [key: string]: string } = {}

    this.classRepository.items.forEach(item => {
      if (!classeNames[item.id.toString()]) {
        classeNames[item.id.toString()] = item.name
      }
    })

    const classMap: Map<string, number> = new Map()
    this.items.forEach(item => {
      const classId = item.classId.toString()
      const currentPoints = classMap.get(classId) || 0

      classMap.set(classId, currentPoints + item.total)
    })

    const classification = Array.from(classMap.entries())
      .map(([classId, totalPoints]) => ({
        classeName: classeNames[classId],
        totalPoints,
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 20)

    return classification
  }

  async findManyPoints({ page }: PaginationParams): Promise<Point[]> {
    const perPage = 20
    const points = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * perPage, page * perPage)

    return points
  }

  async delete(point: Point): Promise<void> {
    const pointIndex = this.items.findIndex(item => item.id === point.id)
    this.items.splice(pointIndex, 1)
  }
}
