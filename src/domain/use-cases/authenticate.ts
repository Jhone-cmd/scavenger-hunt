import { InvalidCredentials } from '@/core/error/invalid-credentials'
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
      throw new InvalidCredentials()
    }

    const passwordMatched = await compare(password, account.password)

    if (!passwordMatched) {
      throw new InvalidCredentials()
    }

    const accessToken = account.id.toString()

    return { accessToken }
  }
}
