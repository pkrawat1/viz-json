import react, { useState, useEffect, memo } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { JsonNodeObject } from './';

const Node = styled.div`
  position: relative;
  padding: 0.3rem 0 0 1rem;
  color: ${(props) => (props.match ? 'red' : 'black')};
`;

const Children = styled.div`
  position: relative;
  padding: 0.3rem 0 0 0.3rem;
  color: ${(props) => (props.match ? 'red' : 'black')};
`;

const propTypes = {
  rootName: string,
};

const JsonNodeList = ({ matchPath, parentMatched, path, rootName, listData, level }) => {
  const [isDataVisible, setIsDataVisible] = useState(false);
  const highLightChildren = matchPath?.includes(path) || parentMatched;

  useEffect(() => {
    level < 2 ? setIsDataVisible(true) : null;
  }, [level]);

  return (
    <Node match={highLightChildren}>
      <button onClick={() => setIsDataVisible(!isDataVisible)}>
        {isDataVisible ? '-' : '+'}
      </button>
      {` ${rootName}`}
      <br />
      <Children match={highLightChildren}>
        {isDataVisible
          ? listData.map((objData, index) => {
              return (
                <JsonNodeObject
                  parentMatched={highLightChildren}
                  matchPath={matchPath}
                  path={`${path}[${index}]`}
                  key={`${path}[${index}]`}
                  objData={objData}
                  level={level + 2}
                />
              );
            })
          : null}
      </Children>
    </Node>
  );
};

JsonNodeList.propTypes = propTypes;

export default memo(JsonNodeList);
