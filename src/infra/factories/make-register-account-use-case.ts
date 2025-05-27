import { RegisterAccountUseCase } from '@/domain/use-cases/register-account'
import { PrismaAccountRepository } from '../database/prisma/prisma-account-repository'

export function makeRegisterAccountUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const registerAccountUseCase = new RegisterAccountUseCase(accountRepository)
  return registerAccountUseCase
}
