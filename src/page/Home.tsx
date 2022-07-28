import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let navigate = useNavigate();
  const connect_wallet = () => {};
  return (
    <StyledComponent>
      {/* <Workflow>
        <HeadText01>Workflow of auto minting</HeadText01>
        <EachPanel01
          onClick={() => {
            navigate('/generate_config');
            window.scrollTo(0, 0);
          }}
        >
          mint by auto generating config&metadata
        </EachPanel01>
        <EachPanel01
          onClick={() => {
            navigate('/choose_assets');
            window.scrollTo(0, 0);
          }}
        >
          mint by choosing config&metadata
        </EachPanel01>
        <GeneratePart>
          <GenerateButton onClick={() => connect_wallet()}>
            Start
          </GenerateButton>
        </GeneratePart>
      </Workflow> */}
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
  /* border-radius: 8px; */
  flex-direction: column;
  align-items: center;
`;
const EachPanel01 = styled(Box)`
  display: flex;
  width: 70%;
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

export default Home;
