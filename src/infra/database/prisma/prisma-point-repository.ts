import { PaginationParams } from '@/core/repositories/pagination-params'
import { Point } from '@/domain/entities/point'
import { PointRepository } from '@/domain/repositories/point-repository'
import { prisma } from '@/infra/lib/prisma'
import { PrismaPointMapper } from '../mappers/prisma-point-mapper'

export class PrismaPointRepository implements PointRepository {
  async create(point: Point): Promise<void> {
    const data = PrismaPointMapper.toPrisma(point)
    await prisma.points.create({
      data,
    })
  }

  async classification(): Promise<
    { classeName: string; totalPoints: number }[]
  > {
    const aggregatedPoints = await prisma.points.groupBy({
      by: ['classId'],
      _sum: {
        total: true,
      },
      orderBy: {
        _sum: {
          total: 'desc',
        },
      },
      take: 20,
    })

    const classIds = aggregatedPoints.map(point => point.classId)

    const classes = await prisma.classes.findMany({
      where: {
        id: { in: classIds },
      },
      select: {
        id: true,
        name: true,
      },
    })

    const classeNamesMap: Record<string, string> = {}

    classes.forEach(classe => {
      classeNamesMap[classe.id] = classe.name
    })

    const classification = aggregatedPoints.map(entry => ({
      classeName: classeNamesMap[entry.classId] || 'unknown',
      totalPoints: entry._sum.total || 0,
    }))

    return classification
  }

  async findManyPoints({ page }: PaginationParams): Promise<Point[]> {
    const perPage = 20
    const points = await prisma.points.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        classe: {
          select: {
            name: true,
          },
        },
        item: {
          select: {
            name: true,
          },
        },
      },
    })

    return points.map(PrismaPointMapper.toDomain)
  }
}
