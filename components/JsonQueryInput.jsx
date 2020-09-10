import react, { useEffect, useState } from 'react';
import styled from 'styled-components';

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

const JsonQueryInput = ({ onChange }) => {
  const [value, setValue] = useState();
  const handleChange = ({ target: { value } }) => setValue(value);

  useEffect(() => onChange(value), [value])

  return (
    <Wrapper>
      <Input
        placeholder='ex: $..book[?(@.price<10)]'
        type='text'
        query='query'
        onChange={handleChange}
        value={value}
      />
      {value ? <CloseButton onClick={() => setValue('')} /> : null}
    </Wrapper>
  );
};

export default JsonQueryInput;
