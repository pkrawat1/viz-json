import react, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 1rem 0;
`;

const Input = styled.input`
  padding: 1rem;
  outline: none;
  border: 1px solid #ededed;
  width: 100%;
`;

const JsonQueryInput = ({ onChange }) => {
  const [value, setValue] = useState();
  const handleChange = ({ target: { value } }) => {
    setValue(value);
    onChange(value);
  };

  return (
    <Wrapper>
      <Input
        placeholder='ex: $..book[?(@.price<10)]'
        type='text'
        query='query'
        onChange={handleChange}
        value={value}
      />
    </Wrapper>
  );
};

export default JsonQueryInput;
