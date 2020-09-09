import react, { useState, useEffect, memo } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { JsonNodeObject } from './';
import { Button } from './Styles';

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
`;

const propTypes = {
  rootName: string,
};

const JsonNodeList = ({
  matchPath,
  parentMatched,
  path,
  rootName,
  listData,
  level,
}) => {
  const [isDataVisible, setIsDataVisible] = useState(false);
  const highLightChildren = matchPath?.includes(path) || parentMatched;

  useEffect(() => {
    level < 2 ? setIsDataVisible(true) : null;
  }, [level]);

  return (
    <Node match={highLightChildren}>
      <Button onClick={() => setIsDataVisible(!isDataVisible)}>
        {isDataVisible ? '-' : '+'}
      </Button>
      {`${rootName}`}
      <ChildContainer match={highLightChildren}>
        {isDataVisible
          ? listData.map((listItem, index) => {
              switch (listItem.constructor.name) {
                case 'Array':
                  return (
                    <JsonNodeList
                      parentMatched={highLightChildren}
                      matchPath={matchPath}
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
                      matchPath={matchPath}
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
                        matchPath?.includes(`${path}[${index}]`) ||
                        highLightChildren
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
