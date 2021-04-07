// import getDateFromToday from '@/utils/getDateFromToday';
// import formatTimeRange from '@/utils/formatTimeRange';

export const time = {
  state: {
    type: 'slider',
    name: 'time',
    value: null,
    min: 10,
    max: 17,
    interval: 0.5,
    marks: ['10:00', '13:00', '16:00', '19:00'],
    header: 'Время доставки',
  },
};
