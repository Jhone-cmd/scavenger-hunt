import { EditAccountUseCase } from '@/domain/use-cases/edit-account'
import { PrismaAccountRepository } from '../database/prisma/prisma-account-repository'

export function makeEditAccountUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const editAccountUseCase = new EditAccountUseCase(accountRepository)
  return editAccountUseCase
}
