import type { Deliverable } from './Deliverable'

export interface DeliverableDB extends Deliverable {
  id: string
  userId: string
}
