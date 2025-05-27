import { ResourceAlreadyExists } from '@/core/error/resource-already-exists'
import { InMemoryClassRepository } from '../../../test/repositories/in-memory-class-repository'
import { CreateClassUseCase } from './create-class'

let inMemoryClassRepository: InMemoryClassRepository
let sut: CreateClassUseCase

describe('Create Class', () => {
  beforeEach(() => {
    inMemoryClassRepository = new InMemoryClassRepository()
    sut = new CreateClassUseCase(inMemoryClassRepository)
  })

  it('should to be able create class', async () => {
    await sut.execute({
      name: 'class-1',
      teacher: 'teacher',
      institutionId: 'institution-1',
    })

    expect(inMemoryClassRepository.items).toHaveLength(1)
    expect(inMemoryClassRepository.items[0]).toEqual(
      expect.objectContaining({ name: 'class-1' })
    )
  })

  it('should not to be able create class with same name', async () => {
    await sut.execute({
      name: 'class-1',
      teacher: 'teacher',
      institutionId: 'institution-1',
    })

    await expect(
      sut.execute({
        name: 'class-1',
        teacher: 'teacher',
        institutionId: 'institution-1',
      })
    ).rejects.toBeInstanceOf(ResourceAlreadyExists)
  })
})
