import { ResourceNotFound } from '@/core/error/resource-not-found'
import { AccountRepository } from '../repositories/account-repository'

export interface EditAccountUseCaseRequest {
  accountId: string
  name?: string
  email?: string
}

type EditAccountUseCaseResponse = null | ResourceNotFound

export class EditAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({
    accountId,
    name,
    email,
  }: EditAccountUseCaseRequest): Promise<EditAccountUseCaseResponse> {
    const account = await this.accountRepository.findById(accountId)

    if (!account) {
      throw new ResourceNotFound()
    }

    account.name = name ? name : account.name
    account.email = email ? email : account.email

    await this.accountRepository.save(account)

    return null
  }
}
