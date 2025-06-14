import { Account } from '../entities/account'

export abstract class AccountRepository {
  abstract create(account: Account): Promise<void>
  abstract findById(id: string): Promise<Account | null>
  abstract findByEmail(email: string): Promise<Account | null>
  abstract save(account: Account): Promise<void>
  abstract delete(account: Account): Promise<void>
}
