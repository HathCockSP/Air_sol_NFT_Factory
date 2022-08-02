import { useState } from 'react';
import { Box } from '@material-ui/core';
import styled from 'styled-components';

const Production = () => {
  return (
    <StyledComponent>
      <Workflow>

      </Workflow>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 90%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Workflow = styled(Box)`
  display: flex;
  width: 100%;
  height: 90%;
  align-items: center;
`;


export default Production;
