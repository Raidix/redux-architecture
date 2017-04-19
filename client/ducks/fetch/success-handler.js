/*
* Специфичный для проекта обработчик успешных ajax запросов
* */

/* eslint-disable require-yield */

// TODO: silent

// Преобразовывает массив в хэш с ключами из id
const arrayToObject = (array) => {
  const resultObject = {};

  array.forEach((raid) => {
    resultObject[raid.id] = raid;
  });

  return resultObject;
};

function* successHandler(dispatch, { status, data }) {
  const resultData = Array.isArray(data.result) ?
    arrayToObject(data.result) :
    data.result;

  // TODO: Обработка warnings
  // const warnings = data.warnings;

  return {
    isSuccess: true,
    status,
    data: resultData,
    originalData: data,
  };
}

export default successHandler;
