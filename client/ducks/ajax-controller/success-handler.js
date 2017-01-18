/* eslint-disable require-yield */

// TODO: silent

function* successHandler(dispatch, { status, data }) {
  let resultData;

  // Преобразовываем массив в хэш
  if (Array.isArray(data.result)) {
    resultData = {};

    data.result.forEach((raid) => {
      resultData[raid.id] = raid;
    });
  } else {
    resultData = data.result;
  }

  // TODO: Обработка warnings
  // const warnings = data.warnings;

  return { status, data: resultData, originalData: data, isSuccess: true };
}

export default successHandler;
