import moment from 'moment';
import 'moment/locale/ru';

export default () => {
  moment.locale('ru');
  moment.updateLocale('ru', {
    monthsShort: {
      format: 'янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек'.split('_'),
      standalone: 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
    },
  });
};
