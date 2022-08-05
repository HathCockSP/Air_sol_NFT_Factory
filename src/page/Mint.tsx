import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { upload_nft, verify_nft, mint_nft } from '../redux/actions/generate';
import { Oval } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css'
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { RiErrorWarningFill, RiCheckboxCircleFill } from 'react-icons/ri';

const Mint = () => {
  const [count, set_count] = useState<any>(0);
  const [upload_flag, set_upload_flag] = useState<any>(0);
  const [verify_flag, set_verify_flag] = useState<any>(0);
  const [mint_flag, set_mint_flag] = useState<any>(0);
  const [start_flag, set_start_flag] = useState<any>(false);
  useEffect(() => {
    set_count(localStorage.getItem('count'));
  }, [set_count]);
  // let navigate = useNavigate();
  // const next_step = () => {
  //   navigate('/generate_config');
  //   window.scrollTo(0, 0);
  // };

  const startMint = () => {
    // if(start_flag === false)
    // {
    //   set_upload_flag(0);
    //   set_verify_flag(0);
    //   set_mint_flag(0);
    // }
    set_start_flag(true);
    if(start_flag === true)
    {
      NotificationManager.error('Please wait while processing.', 'Hi.', 3000);
      return;
    }

    set_upload_flag(1);
    upload_nft().then(success => {
      if (success === true) {
        set_upload_flag(2);
        set_verify_flag(1);
        verify_nft().then(success => {
          if (success === true) {
            set_verify_flag(2);
            mint_nft(count).then(success => {
              if (success === true) {
                set_mint_flag(2);
              } else {
                set_mint_flag(3);
                set_start_flag(false);
              }
            });
          } else {
            set_verify_flag(3);
            set_start_flag(false);
          }
        });
      } else {
        set_upload_flag(3);
        set_start_flag(false);
      }
    });
  };
  return (
    <StyledComponent>
      <Workflow>
        <HeadText01>Please click Start button to Mint NFT</HeadText01>
        <EachPanel01
          onClick={() => {
            // upload_nft();
          }}
        >
          {upload_flag === 0 ? (
            'Upload NFT'
          ) : upload_flag === 1 ? (
            <>
              <Box
                display={'flex'}
                alignItems="center"
                justifyContent={'center'}
              >
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                >
                  Uploading
                </Box>
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                  ml={'20px'}
                >
                  <Oval
                    ariaLabel="loading-indicator"
                    height={35}
                    width={35}
                    strokeWidth={5}
                    color="#176180"
                    secondaryColor="#54c3e7"
                  />
                </Box>
              </Box>
            </>
          ) : upload_flag === 2 ? (
            <>
              <Box
                display={'flex'}
                alignItems="center"
                justifyContent={'center'}
              >
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                >
                  Uploaded
                </Box>
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                  ml={'20px'}
                  fontSize={'1.5rem'}
                  color="#0d9d31"
                >
                  <RiCheckboxCircleFill />
                  Success
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box
                display={'flex'}
                alignItems="center"
                justifyContent={'center'}
              >
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                >
                  Uploaded
                </Box>
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                  ml={'20px'}
                  color="#c11111"
                  fontSize={'1.5rem'}
                >
                  <RiErrorWarningFill />
                  failed
                </Box>
              </Box>
            </>
          )}
        </EachPanel01>
        <Box display={'flex'} justifyContent="center" alignItems={'center'}>
          <HiOutlineChevronDoubleDown
            fontSize={'2.5rem'}
            fontWeight="bold"
            color="white"
          />
        </Box>
        <EachPanel01>
          {verify_flag === 0 ? (
            'Verify NFT'
          ) : verify_flag === 1 ? (
            <>
              <Box
                display={'flex'}
                alignItems="center"
                justifyContent={'center'}
              >
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                >
                  Verifying
                </Box>
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                  ml={'20px'}
                >
                  <Oval
                    ariaLabel="loading-indicator"
                    height={35}
                    width={35}
                    strokeWidth={5}
                    color="#176180"
                    secondaryColor="#54c3e7"
                  />
                </Box>
              </Box>
            </>
          ) : verify_flag === 2 ? (
            <>
              <Box
                display={'flex'}
                alignItems="center"
                justifyContent={'center'}
              >
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                >
                  Verified
                </Box>
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                  ml={'20px'}
                  fontSize={'1.5rem'}
                  color="#0d9d31"
                >
                  <RiCheckboxCircleFill />
                  Success
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box
                display={'flex'}
                alignItems="center"
                justifyContent={'center'}
              >
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                >
                  Verified
                </Box>
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                  ml={'20px'}
                  color="#c11111"
                  fontSize={'1.5rem'}
                >
                  <RiErrorWarningFill />
                  failed
                </Box>
              </Box>
            </>
          )}
        </EachPanel01>
        <Box display={'flex'} justifyContent="center" alignItems={'center'}>
          <HiOutlineChevronDoubleDown
            fontSize={'2.5rem'}
            fontWeight="bold"
            color="white"
          />
        </Box>
        <EachPanel01>{mint_flag === 0 ? (
            'Mint NFT'
          ) : mint_flag === 1 ? (
            <>
              <Box
                display={'flex'}
                alignItems="center"
                justifyContent={'center'}
              >
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                >
                  Minting
                </Box>
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                  ml={'20px'}
                >
                  <Oval
                    ariaLabel="loading-indicator"
                    height={35}
                    width={35}
                    strokeWidth={5}
                    color="#176180"
                    secondaryColor="#54c3e7"
                  />
                </Box>
              </Box>
            </>
          ) : mint_flag === 2 ? (
            <>
              <Box
                display={'flex'}
                alignItems="center"
                justifyContent={'center'}
              >
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                >
                  Minted
                </Box>
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                  ml={'20px'}
                  fontSize={'1.5rem'}
                  color="#0d9d31"
                >
                  <RiCheckboxCircleFill />
                  Success
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box
                display={'flex'}
                alignItems="center"
                justifyContent={'center'}
              >
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                >
                  Minted
                </Box>
                <Box
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                  ml={'20px'}
                  color="#c11111"
                  fontSize={'1.5rem'}
                >
                  <RiErrorWarningFill />
                  failed
                </Box>
              </Box>
            </>
          )}</EachPanel01>
        <GeneratePart>
          <GenerateButton onClick={() => startMint()}>
            Start
          </GenerateButton>
        </GeneratePart>
      </Workflow>
      <NotificationContainer />
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Workflow = styled(Box)`
  display: flex;
  width: 50%;
  height: 80%;
  color: white;
  background-color: #176180;
  /* border-radius: 20px; */
  flex-direction: column;
  align-items: center;
`;
const EachPanel01 = styled(Box)`
  display: flex;
  width: 50%;
  height: 80px;
  color: #176180;
  background-color: white;
  /* border-radius: 8px; */
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-top: auto;
  margin-bottom: auto;
  font-weight: bold;
  /* border: 2px solid #176180; */
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    box-shadow: rgb(255 255 255) 0px 5px 15px;
    /* color: #176180;
    background-color: white; */
  }
`;

const HeadText01 = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 2.3rem;
  font-weight: bold;
  color: white;
`;

const GeneratePart = styled(Box)`
  display: flex;
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
  justify-content: center;
  align-items: center;
`;

const GenerateButton = styled(Box)`
  display: flex;
  width: 300px;
  height: 60px;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #54c3e7;
  /* border-radius: 8px; */
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: #176180;
    background-color: white;
  }
`;

export default Mint;
