import react, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import jp from 'jsonpath';
import { generateMatchPaths } from '../utils/functions';
import { useSelector } from 'react-redux';
import { setMatchPaths } from '../store/actions';
import { JsonQueryInput, JsonNodeList, JsonNodeObject } from './';

const Wrapper = styled.section`
  color: black;
`;

const ScrollArea = styled.div`
  height: 60vh;
  max-width: 300px;
  padding: 0 0.3rem;
  overflow: scroll;
`;

const Children = styled.div`
  position: relative;
  padding: 0.3rem 0 0 0.3rem;
  color: ${(props) => (props.match ? 'red' : 'black')};
`;

const DocLink = styled.a`
  color: palevioletred;
  text-decoration: underline;
  &:hover {
    color: red;
  }
  display: block;
  margin: 0 0 0.7rem;
`

const JsonNavigator = ({ jsonData }) => {
  const query = useSelector((state) => state.query);
  const matchPaths = useSelector((state) => state.matchPaths);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!query) {
      return;
    }
    try {
      const jpPaths = jp.paths(jsonData, query);
      dispatch(setMatchPaths(generateMatchPaths(jpPaths)));
    } catch (_) {
      dispatch(setMatchPaths({}));
    }
  }, [query]);

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
      <JsonQueryInput query={query} />
      <DocLink href="https://hackmd.io/w-INXryRRjOhTbLwWgy6Pw?view" target="_blank">Documentation and Examples</DocLink>
      <h3>Navigation Tree</h3>
      <ScrollArea>{renderNodes(jsonData)}</ScrollArea>
    </Wrapper>
  );
};

export default JsonNavigator;
