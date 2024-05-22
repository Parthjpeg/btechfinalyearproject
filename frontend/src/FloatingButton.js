// FloatingButton.js
import React from 'react';
import styled from 'styled-components';

// Styled components for the floating button and its icon
const FloatingButtonWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const IconButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  font-size: 24px;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// FloatingButton component
const FloatingButton = ({ icon, onClick }) => {
  return (
    <FloatingButtonWrapper>
      <IconButton onClick={onClick}>{icon}</IconButton>
    </FloatingButtonWrapper>
  );
};

export default FloatingButton;
