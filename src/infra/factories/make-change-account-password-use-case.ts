import { ChangeAccountPasswordUseCase } from '@/domain/use-cases/change-account-password'
import { PrismaAccountRepository } from '../database/prisma/prisma-account-repository'

export function makeChangeAccountPasswordUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const changeAccountPasswordUseCase = new ChangeAccountPasswordUseCase(
    accountRepository
  )
  return changeAccountPasswordUseCase
}
