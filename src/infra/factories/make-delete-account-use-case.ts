import { DeleteAccountUseCase } from '@/domain/use-cases/delete-account'
import { PrismaAccountRepository } from '../database/prisma/prisma-account-repository'

export function makeDeleteAccountUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const deleteAccountUseCase = new DeleteAccountUseCase(accountRepository)
  return deleteAccountUseCase
}
