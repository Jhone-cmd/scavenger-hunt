import { InMemoryInstitutionRepository } from '../../../test/repositories/in-memory-institution-repository'
import { CreateInstitutionUseCase } from './create-institution'

let inMemoryInstitutionRepository: InMemoryInstitutionRepository
let sut: CreateInstitutionUseCase

describe('Create Institution', () => {
  beforeEach(() => {
    inMemoryInstitutionRepository = new InMemoryInstitutionRepository()
    sut = new CreateInstitutionUseCase(inMemoryInstitutionRepository)
  })

  it('should to be able create institution', async () => {
    await sut.execute({
      name: 'institution-1',
      responsible: 'alone',
      address: 'Street Nothing',
      phone: '+65 8888-7777',
    })

    expect(inMemoryInstitutionRepository.items).toHaveLength(1)
    expect(inMemoryInstitutionRepository.items[0]).toEqual(
      expect.objectContaining({ name: 'institution-1' })
    )
  })

  it('should not to be able create institution with same name', async () => {
    await sut.execute({
      name: 'institution-1',
      responsible: 'alone',
      address: 'Street Nothing',
      phone: '+65 8888-7777',
    })

    await expect(
      sut.execute({
        name: 'institution-1',
        responsible: 'alone',
        address: 'Street Nothing',
        phone: '+65 8888-7777',
      })
    ).rejects.toThrow('Institution already exists')
  })
})
