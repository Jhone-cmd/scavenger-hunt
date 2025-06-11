import { ResourceNotFound } from '@/core/error/resource-not-found'
import { AccountRepository } from '../repositories/account-repository'

export interface DeleteAccountUseCaseRequest {
  accountId: string
}

type DeleteAccountUseCaseResponse = null | ResourceNotFound

export class DeleteAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({
    accountId,
  }: DeleteAccountUseCaseRequest): Promise<DeleteAccountUseCaseResponse> {
    const account = await this.accountRepository.findById(accountId)

    if (!account) {
      throw new ResourceNotFound()
    }

    await this.accountRepository.delete(account)

    return null
  }
}
