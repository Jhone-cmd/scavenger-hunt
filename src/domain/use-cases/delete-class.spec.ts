import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeClass } from '../../../test/factories/make-class'
import { InMemoryClassRepository } from '../../../test/repositories/in-memory-class-repository'
import { DeleteClassUseCase } from './delete-class'

let inMemoryClassRepository: InMemoryClassRepository
let sut: DeleteClassUseCase

describe('Delete Class', () => {
  beforeEach(() => {
    inMemoryClassRepository = new InMemoryClassRepository()
    sut = new DeleteClassUseCase(inMemoryClassRepository)
  })

  it('should to be able delete class', async () => {
    const classe = makeClass({})
    inMemoryClassRepository.items.push(classe)

    const classId = classe.id.toString()

    await sut.execute({
      classId,
    })

    expect(inMemoryClassRepository.items).toHaveLength(0)
  })

  it('should not to be able delete class not found', async () => {
    await expect(
      sut.execute({
        classId: '',
      })
    ).rejects.throw(ResourceNotFound)
  })
})
