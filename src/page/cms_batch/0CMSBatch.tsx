import { useState } from 'react';
import { Box } from '@material-ui/core';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import SelectBatch from './1SelectBatch';
import UploadBatch from './2UploadBatch';
import ReviewBatch from './3ReviewBatch';
import PrepareConfig from './4PrepareConfig';
import UploadNFT from './5UploadNFT';
import VerifyNFT from './6VerifyNFT';
import MintNFT from './7MintNFT';

import EachStep from '../../components/production/eachstep';
import ArrowDownBox from "../../components/production/arrowdownbox";



const CMSBatch = () => {
  // let navigate = useNavigate();
  const [flag_step_batch, set_flag_step_batch] = useState<any>(0);
  const [flag_step_upload, set_flag_step_upload] = useState<any>(0);
  const [flag_step_prepare, set_flag_step_prepare] = useState<any>(0);
  const [flag_step_review, set_flag_step_review] = useState<any>(0);
  const [flag_step_verifyNFT, set_flag_step_verifyNFT] = useState<any>(0);
  const [flag_step_uploadNFT, set_flag_step_uploadNFT] = useState<any>(0);
  const [flag_step_mintNFT, set_flag_step_mintNFT] = useState<any>(0);

  const [sproduction_name, set_sproduction_name] = useState<any>();
  const [sBatchName, set_sBatchName] = useState<any>();
  const [sBatchData, set_sBatchData] = useState<any>();
  const [sSelectedIDs, set_sSelectedIDs] = useState<any>(0);
  const [flagStep, setFlagStep] = useState<any>(0);
  const [mintCount, setMintCount] = useState<any>(0);

  const [id, setId] = useState<any>();

  return (
    <StyledComponent>
      <Workflow>
        <StepListBox>
          <ContentBox01>
            <EachStep str={'Select batch'} flag_step={flag_step_batch} nextstep={'true'} />
            <ArrowDownBox nextstep={'true'} />
            <EachStep str={'Upload batch'} flag_step={flag_step_upload} nextstep={flag_step_batch===2?'true': 'false'} />
            <ArrowDownBox nextstep={flag_step_batch===2?'true': 'false'} />
            <EachStep str={'Review NFT'} flag_step={flag_step_review} nextstep={flag_step_upload===2?'true': 'false'} />
            <ArrowDownBox nextstep={flag_step_upload===2?'true': 'false'} />
            <EachStep str={'Prepare config'} flag_step={flag_step_prepare} nextstep={flag_step_review===2?'true': 'false'} />
            <ArrowDownBox nextstep={flag_step_review===2?'true': 'false'} />
            <EachStep str={'Upload NFT'} flag_step={flag_step_uploadNFT} nextstep={flag_step_prepare===2?'true': 'false'} />
            <ArrowDownBox nextstep={flag_step_prepare===2?'true': 'false'} />
            <EachStep str={'Verify NFT'} flag_step={flag_step_verifyNFT} nextstep={flag_step_uploadNFT===2?'true': 'false'} />
            <ArrowDownBox nextstep={flag_step_uploadNFT===2?'true': 'false'} />
            <EachStep str={'Mint NFT'} flag_step={flag_step_mintNFT} nextstep={flag_step_verifyNFT===2?'true': 'false'} />
          </ContentBox01>
        </StepListBox>
        <StepInfoBox>
          <ContentBox02>
            <UpPart01>
              <Box display={'felx'} width={'90%'} height={'90%'}>
                {flagStep === 0 ? (
                  <SelectBatch
                    setFlagStep={setFlagStep}
                    set_flag_step_batch={set_flag_step_batch}
                    set_sproduction_name={set_sproduction_name}
                    set_sBatchName={set_sBatchName}
                    set_sBatchData={set_sBatchData}
                    setId={setId}
                  />
                ) : flagStep === 1 ? (
                  <UploadBatch
                    setFlagStep={setFlagStep}
                    sBatchName={sBatchName}
                    sBatchData={sBatchData}
                    set_flag_step_upload={set_flag_step_upload}
                    set_sSelectedIDs={set_sSelectedIDs}
                    id={id}
                  />
                ) : flagStep === 2 ? (
                  <ReviewBatch
                    setFlagStep={setFlagStep}
                    sBatchData={sBatchData}
                    set_flag_step_review={set_flag_step_review}
                    id={id}
                  />
                ) : flagStep === 3 ? (
                  <PrepareConfig
                    sSelectedIDs={sSelectedIDs}
                    setFlagStep={setFlagStep}
                    set_flag_step_prepare={set_flag_step_prepare}
                    id={id}
                    setMintCount={setMintCount}
                  />
                ) : flagStep === 4 ? (
                  <UploadNFT
                    setFlagStep={setFlagStep}
                    set_flag_step_uploadNFT={set_flag_step_uploadNFT}
                    id={id}
                  />
                ) : flagStep === 5 ? (
                  <VerifyNFT
                    setFlagStep={setFlagStep}
                    set_flag_step_verifyNFT={set_flag_step_verifyNFT}
                    id={id}
                  />
                ) : flagStep === 6 ? (
                  <MintNFT
                    setFlagStep={setFlagStep}
                    set_flag_step_mintNFT={set_flag_step_mintNFT}
                    id={id}
                    mintCount={mintCount}
                  />
                ) : (
                  <>123</>
                )}
                {/* <SelectBatch set_flag_step_batch={set_flag_step_batch} /> */}
              </Box>
            </UpPart01>
            <DownPart01>
              <Statistics>
                <GridBox01>Production Name: {sproduction_name}</GridBox01>
                <GridBox01>Batch Name: {sBatchName}</GridBox01>
                <GridBox01>Selected IDs: {sSelectedIDs}</GridBox01>
                <GridBox01>Selected IDs: </GridBox01>
                <GridBox01>Selected IDs: </GridBox01>
                <GridBox01>Selected IDs: </GridBox01>
              </Statistics>
            </DownPart01>
          </ContentBox02>
        </StepInfoBox>
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

const GridBox01 = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600px;
`;
const StepListBox = styled(Box)`
  display: flex;
  flex: 1.2;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  color: white;
  background-color: #176180;
`;

const StepInfoBox = styled(Box)`
  display: flex;
  flex: 3;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ContentBox01 = styled(Box)`
  display: flex;
  width: 80%;
  height: 90%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  overflow-y: auto;
`;

const ContentBox02 = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const UpPart01 = styled(Box)`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  color: white;
  background-color: #176180;
  justify-content: center;
  align-items: center;
`;
const DownPart01 = styled(Box)`
  display: flex;
  width: 100%;
  /* margin-top: 10px; */
  height: 100px;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #176180;
`;

const Statistics = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: auto;
  grid-column-gap: auto;
  width: 90%;
  height: 90%;
  justify-content: center;
  align-items: center;
`;

export default CMSBatch;
