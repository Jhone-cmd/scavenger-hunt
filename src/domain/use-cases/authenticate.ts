import { compare } from 'bcryptjs'
import { AccountRepository } from '../repositories/account-repository'

export interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export interface AuthenticateUseCaseResponse {
  accessToken: string
}

export class AuthenticateUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const account = await this.accountRepository.findByEmail(email)

    if (!account) {
      throw new Error('Credentials Invalid')
    }

    const passwordMatched = await compare(password, account.password)

    if (!passwordMatched) {
      throw new Error('Credentials Invalid')
    }

    const accessToken = account.id.toString()

    return { accessToken }
  }
}
