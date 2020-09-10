import react, { useState, useEffect, memo } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { JsonNodeObject } from './';
import { Button } from './Styles';
import { matchPrevPath } from '../utils/functions';

const Node = styled.div`
  position: relative;
  padding: 0.5rem 0 0 1.3rem;
  color: ${(props) => (props.match ? 'red' : 'black')};
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

const JsonNodeList = ({
  matchPaths,
  parentMatched,
  path,
  rootName,
  listData,
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
    <Node match={highLightChildren}>
      <Button onClick={() => setIsDataVisible(!isDataVisible)}>
        {isDataVisible ? '-' : '+'}
      </Button>
      {`${rootName}`}
      <ChildContainer match={highLightChildren}>
        {isDataVisible
          ? listData.map((listItem, index) => {
              if (!listItem) {
                return (
                  <Children>
                    null <br />
                  </Children>
                );
              }
              switch (listItem.constructor.name) {
                case 'Array':
                  return (
                    <JsonNodeList
                      parentMatched={highLightChildren}
                      matchPaths={matchPaths}
                      path={`${path}[${index}]`}
                      key={`${path}[${index}]`}
                      rootName={key}
                      listData={listItem}
                      level={level + 2}
                    />
                  );
                  break;
                case 'Object':
                  return (
                    <JsonNodeObject
                      parentMatched={highLightChildren}
                      matchPaths={matchPaths}
                      path={`${path}[${index}]`}
                      key={`${path}[${index}]`}
                      objData={listItem}
                      level={level + 2}
                    />
                  );
                  break;
                default:
                  return (
                    <Children
                      match={
                        matchPaths[`${path}[${index}]`] || highLightChildren
                      }
                      key={`${path}[${index}]`}>
                      {listItem} <br />
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

JsonNodeList.propTypes = propTypes;

export default memo(JsonNodeList);
