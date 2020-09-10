import jp from 'jsonpath';

export const generateMatchPaths = (jpPaths) =>
  jpPaths.reduce((acc, match) => {
    acc[jp.stringify(match)] = true;
    return acc;
  }, {});

export const matchPrevPath = (path, jpPaths) =>
  Object.keys(jpPaths).find((_path) => _path.includes(path));
