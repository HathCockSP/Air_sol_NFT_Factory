import { Box } from '@material-ui/core';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import './PropertyText.css';

const PropertyText = ({ firstStr, secondStr }: any) => {
  const showShortStr1 = (string: any) => {
    if (string && string.length > 30) {
      return string.slice(0, 20) + ' ...';
    }
    return string;
  };

  const flagStrLength = (string: any) => {
    if (string && string.length > 30) {
      return true;
    }
    return false;
  };

  return (
    <StyledComponent>
      {firstStr}:
      {flagStrLength(secondStr) ? (
        <>
          <SecondText
            data-tip={secondStr}
            data-for="longStr"
            data-multiline="true"
          >
            {showShortStr1(secondStr)}
          </SecondText>
          <ReactTooltip
            className="extraClass"
            id="longStr"
            effect="solid"
            type="dark"
            place="bottom"
          />
        </>
      ) : (
        <SecondText>{secondStr}</SecondText>
      )}
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  color: #54c3e7;
  font-size: 1.1rem;
  margin-top: 2px;
  margin-bottom: 2px;
  align-items: center;
`;

const SecondText = styled(Box)`
  display: flex;
  color: white;
  font-size: 1.3rem;
  margin-left: 10px;
`;

const MoreBox = styled(Box)`
  display: flex;
  margin-left: 20px;
  color: #54c3e7;
  cursor: pointer;
`;

export default PropertyText;
