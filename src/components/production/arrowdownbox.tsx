import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { GoArrowDown } from 'react-icons/go';

type HeaderStyledProps = {
  nextstep: boolean;
}
const ArrowDownBox = ({nextstep }: any) => {

  return (
    <StyledComponent nextstep={nextstep} >
      <GoArrowDown />
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)<HeaderStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2rem;
  font-weight: bold;
  transition: .5s;
  color: ${({ nextstep }) => nextstep?'white': '#a1a1a1'}
`;

export default ArrowDownBox;
