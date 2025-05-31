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
    })

    if (!classe) return null

    return PrismaClassMapper.toDomain(classe)
  }

  async findById(id: string): Promise<Class | null> {
    const classe = await prisma.classes.findUnique({
      where: {
        id,
      },
    })

    if (!classe) return null

    return PrismaClassMapper.toDomain(classe)
  }
}
