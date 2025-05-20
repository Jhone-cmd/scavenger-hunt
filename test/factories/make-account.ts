import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Account, AccountProps } from '@/domain/entities/account'

export function makeAccount(
  override: Partial<AccountProps> = {},
  id?: UniqueEntityId
) {
  const account = Account.create(
    {
      name: 'john doe',
      email: 'johndoe@email.com',
      password: '123456',
      ...override,
    },
    id
  )

  return account
}
