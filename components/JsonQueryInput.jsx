import react, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useDebounce from '../utils/debouce';
import { setQuery } from '../store/actions';

const Wrapper = styled.section`
  padding: 1rem 0;
  position: relative;
`;

const Input = styled.input`
  padding: 0.5rem;
  outline: none;
  border: 1px solid #ededed;
  width: 100%;
`;

const CloseButton = styled.button`
  height: 20px;
  width: 20px;
  padding: 0 0 1px 0;
  background: palevioletred;
  border-radius: 10px;
  border: 2px solid palevioletred;
  color: white;
  position: absolute;
  right: 0.5rem;
  top: 1.4rem;
  cursor: pointer;
  outline: none;
  ::after {
    content: 'x';
  }
`;

const JsonQueryInput = ({ onChange, query }) => {
  const [queryTerm, setQueryTerm] = useState();
  const dispatch = useDispatch();
  const handleChange = ({ target: { value } }) => setQueryTerm(value);
  const debouncedQuery = useDebounce(queryTerm, 500);

  useEffect(() => setQueryTerm(query), [query])

  useEffect(() => {
    debouncedQuery && dispatch(setQuery(debouncedQuery));
  }, [debouncedQuery]);

  return (
    <Wrapper>
      <Input
        placeholder='ex: $..book[?(@.price<10)]'
        type='text'
        query='query'
        onChange={handleChange}
        value={queryTerm}
      />
      {queryTerm ? <CloseButton onClick={() => setQueryTerm('$')} /> : null}
    </Wrapper>
  );
};

export default memo(JsonQueryInput);
