import { InMemoryAccountRepository } from '../../../test/repositories/in-memory-account-repository'
import { RegisterAccountUseCase } from './register-account'

let inMemoryAccountRepository: InMemoryAccountRepository
let sut: RegisterAccountUseCase

describe('Register Account', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountRepository()
    sut = new RegisterAccountUseCase(inMemoryAccountRepository)
  })

  it('should to able register account', async () => {
    await sut.execute({
      name: 'john doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(inMemoryAccountRepository.items).toHaveLength(1)
    expect(inMemoryAccountRepository.items[0]).toEqual(
      expect.objectContaining({ email: 'johndoe@email.com' })
    )
  })

  it('should not to able register account with same email', async () => {
    await sut.execute({
      name: 'john doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    await expect(
      sut.execute({
        name: 'john doe',
        email: 'johndoe@email.com',
        password: '123456',
      })
    ).rejects.toThrow('Account already exists')
  })
})
