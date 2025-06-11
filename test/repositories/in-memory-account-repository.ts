import { Account } from '@/domain/entities/account'
import { AccountRepository } from '@/domain/repositories/account-repository'

export class InMemoryAccountRepository extends AccountRepository {
  public items: Account[] = []

  async create(account: Account): Promise<void> {
    this.items.push(account)
  }

  async findById(id: string): Promise<Account | null> {
    const account = this.items.find(item => item.id.toString() === id)

    if (!account) return null

    return account
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = this.items.find(item => item.email === email)

    if (!account) return null
    return account
  }

  async save(account: Account): Promise<void> {
    const accountIndex = this.items.findIndex(item => item.id === account.id)
    this.items[accountIndex] = account
  }

  async delete(account: Account): Promise<void> {
    const accountIndex = this.items.findIndex(item => item.id === account.id)
    this.items.splice(accountIndex, 1)
  }
}
