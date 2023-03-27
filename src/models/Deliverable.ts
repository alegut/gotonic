import type { RequestType } from './RequestType'

export interface Deliverable {
  from: string
  to: string
  dispatchDate?: Date | null
  parcelType?: string
  description?: string
  createdAt?: Date
  type: RequestType
}
