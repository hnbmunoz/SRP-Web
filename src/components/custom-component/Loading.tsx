import React from 'react';
import styled from 'styled-components';

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingText = styled.h1`
  color: white;
  font-size: 2em;
`;

const Loading = () => {
  return (
    <LoadingOverlay>
      <LoadingText>Loading...</LoadingText>
    </LoadingOverlay>
  );
};

export default Loading;