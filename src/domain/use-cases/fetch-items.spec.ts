import { makeItem } from '../../../test/factories/make-item'
import { InMemoryItemRepository } from '../../../test/repositories/in-memory-item-repository'
import { FetchItemsUseCase } from './fetch-items'

let inMemoryItemRepository: InMemoryItemRepository
let sut: FetchItemsUseCase

describe('Fetch Item', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository()
    sut = new FetchItemsUseCase(inMemoryItemRepository)
  })

  it('should to be able fetch items', async () => {
    inMemoryItemRepository.create(makeItem({}))
    inMemoryItemRepository.create(makeItem({ name: 'bingo' }))

    await sut.execute({
      page: 1,
    })

    expect(inMemoryItemRepository.items).toHaveLength(2)
  })

  it('should to be able to fetch paginated order', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryItemRepository.create(makeItem({}))
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.items).toHaveLength(2)
  })
})
