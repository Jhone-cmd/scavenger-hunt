import { ResourceNotFound } from '@/core/error/resource-not-found'
import { hash } from 'bcryptjs'
import { AccountRepository } from '../repositories/account-repository'

export interface ChangeAccountPasswordUseCaseRequest {
  accountId: string
  password: string
}

type ChangeAccountPasswordUseCaseResponse = null | ResourceNotFound

export class ChangeAccountPasswordUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({
    accountId,
    password,
  }: ChangeAccountPasswordUseCaseRequest): Promise<ChangeAccountPasswordUseCaseResponse> {
    const account = await this.accountRepository.findById(accountId)

    if (!account) {
      throw new ResourceNotFound()
    }

    const passwordHash = await hash(password, 8)

    account.password = password ? passwordHash : account.password

    await this.accountRepository.save(account)

    return null
  }
}
