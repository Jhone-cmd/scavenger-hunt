import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeAccount } from '../../../test/factories/make-account'
import { InMemoryAccountRepository } from '../../../test/repositories/in-memory-account-repository'
import { ChangeAccountPasswordUseCase } from './change-account-password'

let inMemoryAccountRepository: InMemoryAccountRepository
let sut: ChangeAccountPasswordUseCase

describe('Change Account Password', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountRepository()
    sut = new ChangeAccountPasswordUseCase(inMemoryAccountRepository)
  })

  it('should to be able change account password', async () => {
    const account = makeAccount({})
    inMemoryAccountRepository.create(account)

    const accountId = account.id.toString()

    await sut.execute({
      accountId,
      password: 'new password',
    })

    expect(inMemoryAccountRepository.items[0].password).not.toBeNull()
  })

  it('should not to be able change account password not found', async () => {
    await expect(
      sut.execute({
        accountId: '',
        password: '',
      })
    ).rejects.throw(ResourceNotFound)
  })
})
