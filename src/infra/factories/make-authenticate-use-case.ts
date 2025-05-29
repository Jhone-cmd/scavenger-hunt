import { AuthenticateUseCase } from '@/domain/use-cases/authenticate'
import { PrismaAccountRepository } from '../database/prisma/prisma-account-repository'

export function makeAuthenticateUseCase() {
  const accountRepository = new PrismaAccountRepository()
  const authenticateUseCase = new AuthenticateUseCase(accountRepository)
  return authenticateUseCase
}
