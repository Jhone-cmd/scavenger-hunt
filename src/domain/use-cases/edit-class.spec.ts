import { ResourceNotFound } from '@/core/error/resource-not-found'
import { makeClass } from '../../../test/factories/make-class'
import { InMemoryClassRepository } from '../../../test/repositories/in-memory-class-repository'
import { EditClassUseCase } from './edit-class'

let inMemoryClassRepository: InMemoryClassRepository
let sut: EditClassUseCase

describe('Edit Class', () => {
  beforeEach(() => {
    inMemoryClassRepository = new InMemoryClassRepository()
    sut = new EditClassUseCase(inMemoryClassRepository)
  })

  it('should to be able edit class', async () => {
    const classe = makeClass({})
    inMemoryClassRepository.items.push(classe)

    const classId = classe.id.toString()

    await sut.execute({
      classId,
      name: 'new class',
    })

    expect(inMemoryClassRepository.items[0].name).toEqual('new class')
  })

  it('should not to be able edit class not found', async () => {
    await expect(
      sut.execute({
        classId: '',
      })
    ).rejects.throw(ResourceNotFound)
  })
})
