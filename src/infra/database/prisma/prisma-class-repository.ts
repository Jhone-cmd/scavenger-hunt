import { PaginationParams } from '@/core/repositories/pagination-params'
import { Class } from '@/domain/entities/class'
import { ClassRepository } from '@/domain/repositories/class-repository'
import { prisma } from '@/infra/lib/prisma'
import { PrismaClassMapper } from '../mappers/prisma-class-mapper'

export class PrismaClassRepository implements ClassRepository {
  async create(classe: Class): Promise<void> {
    const data = PrismaClassMapper.toPrisma(classe)

    await prisma.classes.create({
      data,
    })
  }

  async findByName(name: string): Promise<Class | null> {
    const classe = await prisma.classes.findUnique({
      where: {
        name,
      },
      include: {
        institution: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!classe) return null

    return PrismaClassMapper.toDomain(classe)
  }

  async findById(id: string): Promise<Class | null> {
    const classe = await prisma.classes.findUnique({
      where: {
        id,
      },
      include: {
        institution: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!classe) return null

    return PrismaClassMapper.toDomain(classe)
  }

  async findManyClassesWithInstitutionId(
    institutionId: string,
    { page }: PaginationParams
  ): Promise<Class[]> {
    const perPage = 20
    const classes = await prisma.classes.findMany({
      where: {
        institutionId,
      },
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        institution: {
          select: {
            name: true,
          },
        },
      },
    })

    return classes.map(PrismaClassMapper.toDomain)
  }

  async findManyClasses({ page }: PaginationParams): Promise<Class[]> {
    const perPage = 20
    const classes = await prisma.classes.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        institution: {
          select: {
            name: true,
          },
        },
      },
    })

    return classes.map(PrismaClassMapper.toDomain)
  }
}
