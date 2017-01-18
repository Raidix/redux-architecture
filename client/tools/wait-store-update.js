/*
* Используется внутри сигналов для ожидания применения эффекта от всех дельт
* (как правило применяется перед return из всех ajax методов в ducks/data/...)
* */

import _ from 'lodash';

const waitStoreUpdate = () => new Promise(res => _.defer(res));

export default waitStoreUpdate;
