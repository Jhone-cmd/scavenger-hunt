import { hash } from 'bcryptjs'
import { Account } from '../entities/account'
import { AccountRepository } from '../repositories/account-repository'

export interface RegisterAccountUseCaseRequest {
  name: string
  email: string
  password: string
}

export interface RegisterAccountUseCaseResponse {
  account: Account
}

export class RegisterAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterAccountUseCaseRequest): Promise<RegisterAccountUseCaseResponse> {
    const accountWithSameEmail = await this.accountRepository.findByEmail(email)

    if (accountWithSameEmail) {
      throw new Error('account already exists')
    }

    const passwordHash = await hash(password, 8)

    const account = Account.create({
      name,
      email,
      password: passwordHash,
    })

    await this.accountRepository.create(account)

    return { account }
  }
}
