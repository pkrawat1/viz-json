import react, { memo, useRef } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

const FileInput = styled.input`
  display: none;
`;

const propTypes = {
  onFileRead: func.isRequired,
};

const FileReader = ({ onFileRead }) => {
  const fileInputRef = useRef();

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleFileChosen = (event) => {
    event.preventDefault();
    const fileReader = new window.FileReader();
    fileReader.onload = ({ target: { result } }) => {
      onFileRead(JSON.parse(result));
    };

    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <a onClick={openFileDialog}>
      <h3>File Uploader &rarr;</h3>
      <p>Select a json file to visualize on the left panel. </p>
      <FileInput
        ref={fileInputRef}
        type='file'
        id='file'
        accept='.json'
        onChange={handleFileChosen}
      />
    </a>
  );
};

FileReader.propTypes = propTypes;

export default memo(FileReader);
