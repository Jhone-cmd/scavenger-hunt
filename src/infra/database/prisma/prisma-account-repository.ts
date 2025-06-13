import { Account } from '@/domain/entities/account'
import { AccountRepository } from '@/domain/repositories/account-repository'
import { prisma } from '@/infra/lib/prisma'
import { PrismaAccountMapper } from '../mappers/prisma-account-mapper'

export class PrismaAccountRepository implements AccountRepository {
  async create(account: Account): Promise<void> {
    const data = PrismaAccountMapper.toPrisma(account)
    await prisma.accounts.create({
      data,
    })
  }

  async findById(id: string): Promise<Account | null> {
    const account = await prisma.accounts.findUnique({
      where: {
        id,
      },
    })

    if (!account) return null

    return PrismaAccountMapper.toDomain(account)
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = await prisma.accounts.findUnique({
      where: {
        email,
      },
    })

    if (!account) return null

    return PrismaAccountMapper.toDomain(account)
  }

  async save(account: Account): Promise<void> {
    const data = PrismaAccountMapper.toPrisma(account)
    await prisma.accounts.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(account: Account): Promise<void> {
    const data = PrismaAccountMapper.toPrisma(account)
    await prisma.accounts.delete({
      where: {
        id: data.id,
      },
    })
  }
}
