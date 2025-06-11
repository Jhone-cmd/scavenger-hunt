import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeAccount } from '../../../test/factories/make-account'
import { InMemoryAccountRepository } from '../../../test/repositories/in-memory-account-repository'
import { DeleteAccountUseCase } from './delete-account'

let inMemoryAccountRepository: InMemoryAccountRepository
let sut: DeleteAccountUseCase

describe('Delete Account', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountRepository()
    sut = new DeleteAccountUseCase(inMemoryAccountRepository)
  })

  it('should to be able delete account', async () => {
    const account = makeAccount({})
    inMemoryAccountRepository.create(account)

    const accountId = account.id.toString()

    await sut.execute({
      accountId,
    })

    expect(inMemoryAccountRepository.items).toHaveLength(0)
  })

  it('should not to be able delete account not found', async () => {
    await expect(
      sut.execute({
        accountId: '',
      })
    ).rejects.throw(ResourceNotFound)
  })
})
