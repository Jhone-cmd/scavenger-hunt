import { Account } from '@/domain/entities/account'
import { AccountRepository } from '@/domain/repositories/account-repository'

export class InMemoryAccountRepository extends AccountRepository {
  public items: Account[] = []

  async create(account: Account): Promise<void> {
    this.items.push(account)
  }
  async findByEmail(email: string): Promise<Account | null> {
    const account = this.items.find(item => item.email === email)

    if (!account) return null
    return account
  }
}
