import getDateFromToday from '@/utils/getDateFromToday';
import formatDate from '@/utils/formatDate';

const minDate = getDateFromToday(1);
const maxDate = getDateFromToday(7);

export const date = {
  state: {
    type: 'text',
    name: 'date',
    value: '',
    mask: {
      mask: Date,
      pattern: 'd{ - }`m{ - }`Y',
      lazy: false,
      min: minDate,
      max: maxDate,
    },
    isValid: false,
    header: 'Дата доставки',
    errorMessage: `Укажите дату доставки <br>с ${formatDate(minDate)} <br>по ${formatDate(maxDate)}`,
    accusativeName: 'дату',
  },
};
