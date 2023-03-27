import { RequestType, type DeliverableDB } from '@/models'

export const requests: DeliverableDB[] = [
  {
    id: '81wk1rdk9i',
    userId: '41wk1rdk9i',
    from: 'Kyiv',
    to: 'Odesa',
    dispatchDate: new Date('2023-03-27T23:00:00.000Z'),
    parcelType: 'Drinks',
    description: 'Alcohol',
    createdAt: new Date('2023-03-21T14:01:23.885Z'),
    type: RequestType.Order
  },
  {
    id: '41wk1gr6ei',
    userId: '41wk1rdk9i',
    from: 'Kharkiv',
    to: 'Dnipro',
    dispatchDate: new Date('2023-03-28T23:00:00.000Z'),
    parcelType: 'Clothes',
    description: 'Used',
    createdAt: new Date('2023-03-20T14:19:11.888Z'),
    type: RequestType.Order
  },
  {
    id: '99wk1gr6ei',
    userId: '41wk1rdk9i',
    from: 'Kharkiv',
    to: 'Odesa',
    dispatchDate: new Date('2023-03-28T23:00:00.000Z'),
    parcelType: 'Drinks',
    description: 'Water',
    createdAt: new Date('2023-03-20T14:19:11.888Z'),
    type: RequestType.Order
  },
  {
    id: '79wk1gr6ei',
    userId: '41wk1rdk9i',
    from: 'Dnipro',
    to: 'Odesa',
    dispatchDate: new Date('2023-03-28T23:00:00.000Z'),
    parcelType: 'Medicines',
    description: 'Paracetamol',
    createdAt: new Date('2023-03-20T14:19:11.888Z'),
    type: RequestType.Order
  }
]
