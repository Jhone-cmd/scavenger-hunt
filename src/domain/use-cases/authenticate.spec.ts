import { hash } from 'bcryptjs'
import { makeAccount } from '../../../test/factories/make-account'
import { InMemoryAccountRepository } from '../../../test/repositories/in-memory-account-repository'
import { AuthenticateUseCase } from './authenticate'

let inMemoryAccountRepository: InMemoryAccountRepository
let sut: AuthenticateUseCase

describe('Authenticate', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountRepository()
    sut = new AuthenticateUseCase(inMemoryAccountRepository)
  })

  it('should to able authenticate account', async () => {
    const account = makeAccount({ password: await hash('123456', 8) })

    inMemoryAccountRepository.create(account)

    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(result).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not to able authenticate account with password wrong', async () => {
    const account = makeAccount({ password: await hash('123456', 8) })

    inMemoryAccountRepository.create(account)

    await expect(
      sut.execute({
        email: 'johndoe@email.com',
        password: '1234567',
      })
    ).rejects.toThrow('Credentials Invalid')
  })
})
