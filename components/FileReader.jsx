import react, { memo, useRef, useState } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.a`
  cursor: pointer;
  color: ${(props) => (props.highlight ? 'palevioletred' : 'black')};
`;

const FileInput = styled.input`
  display: none;
`;

const propTypes = {
  onFileRead: func.isRequired,
};

const FileReader = ({ onFileRead }) => {
  const fileInputRef = useRef();
  const [highlight, setHighlight] = useState(false);

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const readFile = (file) => {
    const fileReader = new window.FileReader();
    fileReader.onload = ({ target: { result } }) => {
      onFileRead(JSON.parse(result));
    };

    fileReader.readAsText(file);
  };

  const onDrop = (event) => {
    event.preventDefault();
    readFile(event.dataTransfer.files[0]);
    setHighlight(false);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setHighlight(true);
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setHighlight(false);
  };

  const handleFileChosen = (event) => {
    event.preventDefault();
    readFile(event.target.files[0]);
  };

  return (
    <Wrapper
      highlight={highlight}
      onClick={openFileDialog}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}>
      <h3>File Uploader &#128206;</h3>
      <p>Drag or select a json file to visualize on the right panel. </p>
      <FileInput
        ref={fileInputRef}
        type='file'
        id='file'
        accept='.json'
        onChange={handleFileChosen}
      />
    </Wrapper>
  );
};

FileReader.propTypes = propTypes;

export default memo(FileReader);
