import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ReactTooltip from 'react-tooltip';
import { BsCheckCircle } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';


type HeaderStyledProps = {
  nextstep: boolean;
}
const EachStep = ({ str, flag_step, nextstep }: any) => {

  return (
    <StyledComponent nextstep={nextstep} >
      {str}
      {flag_step === 0 ? (
        <></>
      ) : flag_step === 1 ? (
        <>
          <Box
            display={'flex'}
            alignItems="center"
            justifyContent={'center'}
            position={'absolute'}
            right={'20px'}
            data-tip
            data-for="processing"
            style={{cursor:'pointer'}}
          >
            <Oval
              ariaLabel="loading-indicator"
              height={25}
              width={25}
              strokeWidth={5}
              color="#176180"
              secondaryColor="#54c3e7"
            />
          </Box>
          <ReactTooltip id="processing" type="warning" effect="solid" place="right">
            <span>processing</span>
          </ReactTooltip>
        </>
      ) : flag_step === 2 ? (
        <>
          <Box
            display={'flex'}
            alignItems="center"
            justifyContent={'center'}
            position={'absolute'}
            right={'20px'}
            color={'#22ac47'}
            fontSize={'25px'}
            fontWeight={'700'}
            data-tip
            data-for="success"
            style={{cursor:'pointer'}}
          >
            <BsCheckCircle />
          </Box>
          <ReactTooltip id="success" type="success" effect="solid" place="right">
            <span>success</span>
          </ReactTooltip>
        </>
      ) : (
        <>
        <Box
          display={'flex'}
          alignItems="center"
          justifyContent={'center'}
          position={'absolute'}
          right={'20px'}
          color={'#c32828'}
          fontSize={'30px'}
          fontWeight={'700'}
          data-tip
          data-for="failed"
          style={{cursor:'pointer'}}
        >
          <BiErrorCircle />
        </Box>
        <ReactTooltip id="failed" type="error" effect="solid" place="right">
            <span>failed</span>
          </ReactTooltip>
        </>
      )}
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)<HeaderStyledProps>`
  display: flex;
  position: relative;
  width: 100%;
  min-height: 55px;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #176180;
  font-size: 1.2rem;
  font-weight: bold;
  transition: .5s;
  background-color:  ${({ nextstep }) => nextstep?'white': '#a1a1a1'};

`;

export default EachStep;
