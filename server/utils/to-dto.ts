import type { Document, WithId } from 'mongodb'
import type { ZodType } from 'zod'

/**
 * Turns a raw Mongo document into the public shape described by `schema`:
 * `_id` becomes a string `id`, bookkeeping timestamps are dropped.
 */
export function toDto<T>(doc: WithId<Document>, schema: ZodType<T>): T {
  const { _id, createdAt: _createdAt, updatedAt: _updatedAt, ...fields } = doc
  return schema.parse({ ...fields, id: _id.toHexString() })
}
