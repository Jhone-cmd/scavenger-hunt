import { Point } from '@/domain/entities/point'
import { PointRepository } from '@/domain/repositories/point-repository'
import { InMemoryClassRepository } from './in-memory-class-repository'

export class InMemoryPointRepository implements PointRepository {
  public items: Point[] = []

  constructor(private classRepository: InMemoryClassRepository) {}

  async create(point: Point): Promise<void> {
    this.items.push(point)
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
}
