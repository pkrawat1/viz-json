import react, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { JsonQueryInput, JsonNodeList, JsonNodeObject } from './';
import jp from 'jsonpath';

const Wrapper = styled.section`
  color: black;
`;

const ScrollArea = styled.div`
  min-height: 60vh;
  overflow: scroll;
`;

const Children = styled.div`
  position: relative;
  padding: 0.3rem 0 0 0.3rem;
  color: ${(props) => (props.match ? 'red' : 'black')};
`;

const JsonNavigator = ({ jsonData }) => {
  const [matchPath, setMatchPath] = useState([]);

  const handleQuery = useCallback((query) => {
    try {
      setMatchPath(
        jp.paths(jsonData, query).map((match) => jp.stringify(match))
      );
    } catch {
      setMatchPath([]);
    }
  }, [jsonData]);

  const renderNodes = (objData, level = 0) => {
    return (
      <>
        {Object.keys(objData).map((key) => {
          switch (objData[key].constructor.name) {
            case 'Array':
              return (
                <JsonNodeList
                  matchPath={matchPath}
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
                  matchPath={matchPath}
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
                <Children
                  match={matchPath?.includes(`$.${key}`)}
                  key={`$.${key}`}>
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
