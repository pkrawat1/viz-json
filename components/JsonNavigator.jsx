import react, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { JsonQueryInput, JsonNodeList, JsonNodeObject } from './';
import jp from 'jsonpath';
import { generateMatchPaths } from '../utils/functions';

const Wrapper = styled.section`
  color: black;
`;

const ScrollArea = styled.div`
  min-height: 60vh;
  min-width: 300px;
  overflow: scroll;
`;

const Children = styled.div`
  position: relative;
  padding: 0.3rem 0 0 0.3rem;
  color: ${(props) => (props.match ? 'red' : 'black')};
`;

const JsonNavigator = ({ jsonData }) => {
  const [matchPaths, setMatchPaths] = useState({});

  const handleQuery = useCallback(
    (query) => {
      try {
        const jpPaths = jp.paths(jsonData, query);
        setMatchPaths(generateMatchPaths(jpPaths));
      } catch (_) {
        console.log('error');
        setMatchPaths({});
      }
    },
    [jsonData]
  );

  const renderNodes = (objData, level = 0) => {
    return (
      <>
        {Object.keys(objData).map((key) => {
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
                  matchPaths={matchPaths}
                  path={`$.${key}`}
                  key={`$.${key}`}
                  rootName={key}
                  listData={objData[key]}
                  level={level}
                />
              );
              break;
            case 'Object':
              return (
                <JsonNodeObject
                  matchPaths={matchPaths}
                  key={`$.${key}`}
                  path={`$.${key}`}
                  rootName={key}
                  objData={objData[key]}
                  level={level + 1}
                />
              );
              break;

            default:
              return (
                <Children match={matchPaths[`$.${key}`]} key={`$.${key}`}>
                  {key}: {objData[key]} <br />
                </Children>
              );
              break;
          }
        })}
      </>
    );
  };

  return (
    <Wrapper>
      <JsonQueryInput onChange={handleQuery} />
      <h3>Navigation Tree</h3>
      <ScrollArea>{renderNodes(jsonData)}</ScrollArea>
    </Wrapper>
  );
};

export default JsonNavigator;
