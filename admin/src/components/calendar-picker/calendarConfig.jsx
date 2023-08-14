import { GrNext, GrPrevious } from 'react-icons/gr';

const locale = {
  days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
};

const calendarOptions = {
  maxDate: new Date('01-01-2099'),
  minDate: new Date('01-01-2020'),
  next2Label: null,
  prev2Label: null,
  nextLabel: <GrNext />,
  prevLabel: <GrPrevious />,
};

export { locale, calendarOptions };
