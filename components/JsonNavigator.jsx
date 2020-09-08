import react, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { JsonQueryInput, JsonNodeList, JsonNodeObject } from './';
import jp from 'jsonpath';

const Wrapper = styled.section`
  color: black;
`;

const Node = styled.div`
  position: relative;
  padding: 0.3rem 0 0 1rem;
`;

const Children = styled.div`
  position: relative;
  padding: 0.3rem 0 0 0.3rem;
  color: ${(props) => (props.match ? 'red' : 'black')};
`;

const JsonNavigator = () => {
  const jsonData = {
    store: {
      book: [
        {
          category: 'reference',
          author: 'Nigel Rees',
          title: 'Sayings of the Century',
          price: 8.95,
        },
        {
          category: 'fiction',
          author: 'Evelyn Waugh',
          title: 'Sword of Honour',
          price: 12.99,
        },
        {
          category: 'fiction',
          author: 'Herman Melville',
          title: 'Moby Dick',
          isbn: '0-553-21311-3',
          price: 8.99,
        },
        {
          category: 'fiction',
          author: 'J. R. R. Tolkien',
          title: 'The Lord of the Rings',
          isbn: '0-395-19395-8',
          price: 22.99,
        },
      ],
      bicycle: [
        {
          color: 'red',
          price: 19.95,
        },
        {
          color: 'blue',
          price: 15.95,
        },
      ],
    },
  };
  const [itemVisibleList, setItemVisibleList] = useState({});
  const [matchPath, setMatchPath] = useState([]);

  const handleToggleItemVisibility = (key) => {
    setItemVisibleList({
      ...itemVisibleList,
      [key]: !itemVisibleList[key],
    });
  };

  const handleQuery = useCallback((query) => {
    try {
      setMatchPath(
        jp.paths(jsonData, query).map((match) => jp.stringify(match))
      );
    } catch {}
  }, []);

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
                <Children match={matchPath?.includes(`$.${key}`)} key={`$.${key}`}>
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
      {renderNodes(jsonData)}
    </Wrapper>
  );
};

export default JsonNavigator;
