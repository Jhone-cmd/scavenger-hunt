import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Account } from '@/domain/entities/account'
import { Prisma, Accounts as PrismaAccount } from '@prisma/client'

export class PrismaAccountMapper {
  static toDomain(raw: PrismaAccount): Account {
    return Account.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityId(raw.id)
    )
  }

  static toPrisma(account: Account): Prisma.AccountsUncheckedCreateInput {
    return {
      id: account.id.toString(),
      name: account.name,
      email: account.email,
      password: account.password,
      createdAt: account.createdAt,
    }
  }
}
