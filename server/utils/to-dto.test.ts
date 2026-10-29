import { ObjectId } from 'mongodb'
import { describe, expect, it } from 'vitest'
import { ZodError } from 'zod'
import { skillSchema } from '../../shared/schemas/skill'
import { toDto } from './to-dto'

const timestamps = { createdAt: new Date(), updatedAt: new Date() }

describe('toDto', () => {
  it('replaces _id with a hex string id and drops timestamps', () => {
    const _id = new ObjectId()
    const dto = toDto({ _id, name: 'Vue', icon: 'simple-icons:vuedotjs', category: 'frontend', sortOrder: 1, ...timestamps }, skillSchema)

    expect(dto.id).toBe(_id.toHexString())
    expect(dto.id).toMatch(/^[0-9a-f]{24}$/)
    expect(dto).not.toHaveProperty('_id')
    expect(dto).not.toHaveProperty('createdAt')
    expect(dto).not.toHaveProperty('updatedAt')
  })

  it('throws a ZodError for an invalid document', () => {
    expect(() => toDto({ _id: new ObjectId(), name: 'Vue', icon: 'vue', category: 'frontend', sortOrder: 1 }, skillSchema))
      .toThrow(ZodError)
  })
})
