import moment from 'moment';

export default [
  {
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0
  },
  {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: moment(0)
      .subtract(4, 'days')
      .valueOf()
  },
  {
    id: '3',
    description: 'Credit Card',
    note: 'month payment',
    amount: 4500,
    createdAt: moment(0)
      .add(4, 'days')
      .valueOf()
  },
  {
    id: '4',
    description: 'Bus Ticket',
    note: '',
    amount: 100,
    createdAt: moment(0).valueOf()
  },
  {
    id: '5',
    description: 'Water Bottle',
    note: '',
    amount: 200,
    createdAt: moment(0).valueOf()
  },
  {
    id: '6',
    description: 'Lunch',
    note: '',
    amount: 300,
    createdAt: moment(0).valueOf()
  }
];
