/* Используется для ожидания применения всех изменений в store */

import _ from 'lodash';

export default () => new Promise(res => _.defer(res));
