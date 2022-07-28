import { Box } from '@material-ui/core';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import './PropertyText.css';

const PropertyObjectText = ({ firstStr, content, dataFor }: any) => {
  return (
    <StyledComponent>
      {firstStr}:{' '}
      <SecondText
        data-tip
        data-for={dataFor}
        // data-multiline="true"
      >
        show details
      </SecondText>
      <ReactTooltip
        className="extraClass1"
        id={dataFor}
        effect="solid"
        type="dark"
        place="bottom"
      >
        <Box display={'flex'}>
          <Box display={'flex'} flexDirection={'column'}>
            {content &&
              content.map((each: any, index: any) => {
                return <Box display={'flex'} key={index}>{JSON.stringify(each)}</Box>;
              })}
          </Box>
        </Box>
      </ReactTooltip>
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
  &:hover {
    cursor: pointer;
    transition: 0.5s;
    text-shadow: 0 0px 10px white;
  }
`;

const MoreBox = styled(Box)`
  display: flex;
  margin-left: 20px;
  color: #54c3e7;
  cursor: pointer;
`;

export default PropertyObjectText;
