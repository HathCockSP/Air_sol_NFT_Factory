import { Box } from '@material-ui/core';
// import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { choose_assets, generate_config } from '../redux/actions/generate';

const ChooseAssets = () => {
  let navigate = useNavigate();
  // const [config, set_config] = useState<any>({
  //   price: null,
  //   number: null,
  //   gatekeeper: null,
  //   solTreasuryAccount: '',
  //   splTokenAccount: null,
  //   splToken: null,
  //   goLiveDate: '',
  //   endSettings: null,
  //   whitelistMintSettings: null,
  //   hiddenSettings: null,
  //   storage: 'arweave',
  //   ipfsInfuraProjectId: null,
  //   ipfsInfuraSecret: null,
  //   nftStorageKey: null,
  //   awsS3Bucket: null,
  //   noRetainAuthority: false,
  //   noMutable: false,
  // });
  const importConfig = (import_configFile: any) => {
    const readerConfig: any = new FileReader();
    readerConfig.onload = () => {
      try {
        generate_config(JSON.parse(readerConfig.result));
        // set_config(JSON.parse(readerConfig.result));
      } catch (e: any) {
        alert('Not valid JSON file!');
      }
    };
    if (import_configFile !== undefined) {
      readerConfig.readAsText(import_configFile);
    }


  };

  const uploadAssets = (files: any) => {
    const formData: any = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('choose_assets', files[i]);
    }
    choose_assets(formData);
  };

  return (
    <StyledComponent>
      <Workflow>
        <HeadText01>Choose config and metadata assets</HeadText01>
        <Box display={'flex'} mt={'auto'} mb={'auto'}>
          <label {...{ htmlFor: 'upload' }}>
            <EachPanel01>choose config</EachPanel01>
          </label>
          <input
            id={'upload'}
            type="file"
            accept=".json"
            onChange={(e: any) => importConfig(e.target.files[0])}
            hidden
          />
        </Box>
        <Box display={'flex'} mt={'auto'} mb={'auto'}>
          <label {...{ htmlFor: 'upload1' }}>
            <EachPanel01>choose assets</EachPanel01>
          </label>
          <input
            id={'upload1'}
            type="file"
            accept=".json, .png, .jpg, .bmp, .gif"
            multiple
            onChange={(e: any) => uploadAssets(e.target.files)}
            hidden
          />
        </Box>
        <GeneratePart>
          <GenerateButton
            onClick={() => {
              navigate('/preview');
              window.scrollTo(0, 0);
            }}
          >
            Next
          </GenerateButton>
        </GeneratePart>
      </Workflow>
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
  width: 400px;
  height: 100px;
  color: #176180;
  background-color: white;
  /* border-radius: 8px; */
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  /* border: 2px solid #176180; */
  cursor: pointer;
  &:hover {
    transition: 0.3s;
    box-shadow: rgb(255 255 255) 0px 5px 15px;
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
  &:hover {
    transition: 0.5s;
    color: #176180;
    background-color: white;
  }
`;

export default ChooseAssets;
