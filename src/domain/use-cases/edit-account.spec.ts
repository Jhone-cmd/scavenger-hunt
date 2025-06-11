import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeAccount } from '../../../test/factories/make-account'
import { InMemoryAccountRepository } from '../../../test/repositories/in-memory-account-repository'
import { EditAccountUseCase } from './edit-account'

let inMemoryAccountRepository: InMemoryAccountRepository
let sut: EditAccountUseCase

describe('Edit Account', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountRepository()
    sut = new EditAccountUseCase(inMemoryAccountRepository)
  })

  it('should to be able edit account', async () => {
    const account = makeAccount({})
    inMemoryAccountRepository.create(account)

    const accountId = account.id.toString()

    await sut.execute({
      accountId,
      name: 'new account',
    })

    expect(inMemoryAccountRepository.items[0].name).toEqual('new account')
  })

  it('should not to be able edit account not found', async () => {
    await expect(
      sut.execute({
        accountId: '',
      })
    ).rejects.throw(ResourceNotFound)
  })
})
