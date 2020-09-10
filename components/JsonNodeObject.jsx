import react, { useState, useEffect, memo } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { JsonNodeList } from './';
import { Button } from './Styles';
import { matchPrevPath } from '../utils/functions';

const Node = styled.div`
  position: relative;
  padding: 0.5rem 0 0 1.3rem;
  color: ${(props) => (props.match ? 'red' : 'black')};
  display: ${(props) => (props.parentIsList ? 'flex' : 'block')};
`;

const ChildContainer = styled.div`
  position: relative;
  padding-left: 0.3rem;
  color: ${(props) => (props.match ? 'red' : 'black')};
`;

const Children = styled.div`
  position: relative;
  padding: 0.5rem 0 0 0.3rem;
  &:first-child {
    padding-top: 0.1rem;
  }
  &:last-child {
    padding-bottom: 0.3rem;
  }
  color: ${(props) => (props.match ? 'red' : 'black')};
`;

const propTypes = {
  rootName: string,
};

const JsonNodeObject = ({
  matchPaths,
  parentMatched,
  path,
  rootName,
  objData,
  level,
}) => {
  const [isDataVisible, setIsDataVisible] = useState(false);
  const highLightChildren = matchPaths[path] || parentMatched;

  useEffect(() => {
    level < 2 ? setIsDataVisible(true) : null;
  }, [level]);

  useEffect(() => {
    matchPrevPath(path, matchPaths)
      ? setIsDataVisible(true)
      : level < 2
      ? setIsDataVisible(true)
      : setIsDataVisible(false);
  }, [matchPaths]);

  return (
    <Node match={highLightChildren} parentIsList={!rootName}>
      <Button onClick={() => setIsDataVisible(!isDataVisible)}>
        {isDataVisible ? '-' : '+'}
      </Button>
      {rootName
        ? `${rootName}`
        : isDataVisible
        ? null
        : `${JSON.stringify(objData).slice(0, 20)}...}`}
      <ChildContainer match={highLightChildren}>
        {isDataVisible
          ? Object.keys(objData).map((key) => {
              if (!objData[key]) {
                return (
                  <Children>
                    {key}: null <br />
                  </Children>
                );
              }
              switch (objData[key].constructor.name) {
                case 'Array':
                  return (
                    <JsonNodeList
                      parentMatched={highLightChildren}
                      matchPaths={matchPaths}
                      path={`${path}.${key}`}
                      key={`${path}.${key}`}
                      rootName={key}
                      listData={objData[key]}
                      level={level}
                    />
                  );
                  break;
                case 'Object':
                  return (
                    <JsonNodeObject
                      parentMatched={highLightChildren}
                      matchPaths={matchPaths}
                      path={`${path}.${key}`}
                      key={`${path}.${key}`}
                      objData={objData[key]}
                      rootName={key}
                      level={level + 1}
                    />
                  );
                  break;
                default:
                  return (
                    <Children
                      match={matchPaths[`${path}.${key}`] || highLightChildren}
                      key={`${path}.${key}`}>
                      {key}: {objData[key]} <br />
                    </Children>
                  );
                  break;
              }
            })
          : null}
      </ChildContainer>
    </Node>
  );
};

JsonNodeObject.propTypes = propTypes;

export default memo(JsonNodeObject);
