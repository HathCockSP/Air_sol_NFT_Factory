import { useState } from "react";
import { Box } from "@material-ui/core";
import styled from "styled-components";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { upload_nft } from "../../redux/actions/production";

const UploadNFT = ({ setFlagStep, set_flag_step_uploadNFT, id }: any) => {
  const [progress, setProgress] = useState<any>(0);
  const [flagProcessBtn, setFlagProcessBtn] = useState<any>(false);

  const uploadNFT = () => {
    setFlagProcessBtn(true);
    if (flagProcessBtn === true) {
      NotificationManager.error("Please wait while processing.", "Hi.", 3000);
      return;
    }
    set_flag_step_uploadNFT(1);
    upload_nft(id).then((res) => {
      if (res.success) {
        const timer = setInterval(() => {
          setProgress((oldProgress: any) => {
            if (oldProgress === 100) {
              setTimeout(() => {
                setFlagProcessBtn(false);
                set_flag_step_uploadNFT(2);
                setFlagStep(5);
              }, 1000);
              return 100;
            }
            const diff = Math.round(Math.random() * 10);
            return Math.min(oldProgress + diff, 100);
          });
        }, res.exeTime / 100);
        return () => {
          clearInterval(timer);
        };
      } else {
        setFlagProcessBtn(false);
        set_flag_step_uploadNFT(3);
        return;
      }
    });
  };

  return (
    <StyledComponent>
      <ProgressBox01>
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={{
            // Customize the path, i.e. the "completed progress"
            path: {
              // Path color
              stroke: `rgba(84, 195, 231, 1)`,
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",
              // Customize transition animation
              transition: "stroke-dashoffset 0.5s ease 0s",
              // Rotate the path

              transformOrigin: "center center",
            },
            // Customize the circle behind the path, i.e. the "total progress"
            trail: {
              // Trail color
              stroke: "white",
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",
              // Rotate the trail
              transformOrigin: "center center",
            },
            // Customize the text
            text: {
              // Text color
              fill: "white",
              // Text size
              fontSize: "25px",
              fontWeight: "bold",
            },
            // Customize background - only used when the `background` prop is true
            background: {
              fill: "#3e98c7",
            },
          }}
        />
      </ProgressBox01>
      <GeneratePart>
        <GenerateButton onClick={() => uploadNFT()}>UPLOAD NFT</GenerateButton>
      </GeneratePart>
      <NotificationContainer />
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProgressBox01 = styled(Box)`
  display: flex;
  flex: 1;
  height: 50%;
  justify-content: center;
  align-items: center;
`;

const GeneratePart = styled(Box)`
  display: flex;
  width: 100%;
  height: 50px;
  margin-top: auto;
  margin-bottom: auto;
  justify-content: center;
  align-items: center;
`;

const GenerateButton = styled(Box)`
  display: flex;
  width: 200px;
  height: 100%;
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

export default UploadNFT;
