import { Account } from '../entities/account'

export abstract class AccountRepository {
  abstract create(account: Account): Promise<void>
  abstract findByEmail(email: string): Promise<Account | null>
}
