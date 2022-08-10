import { Box } from '@material-ui/core';
// import { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { get_assets } from '../redux/actions/preview';

const Preview = () => {
  // const inputRef = useRef<any>(null);
  const [select_num, set_select_num] = useState<any>(1);
  const [total_num, set_total_num] = useState<any>(0);
  const [files, set_files] = useState<any>([]);
  const [flag_full, set_flag_full] = useState<any>(false);

  let navigate = useNavigate();
  const next_step = () => {
    navigate('/mint');
    window.scrollTo(0, 0);
  };

  const show_short = (string: any) => {
    return string && string.slice(0, 6) + '...' + string.slice(-6);
  };

  // const handleClick = () => {
  //   inputRef.current.click();
  // };

  // const handleFileChange = (event: any) => {
  //   const fileObj = event.target.files;
  //   if (!fileObj) {
  //     return;
  //   }
  //   const temp_name: any = [];
  //   for (var i = 0; i < fileObj.length; i++) {
  //     temp_name.push(fileObj[i].name);
  //   }
  //   console.log(temp_name);
  // };

  useEffect(() => {
    get_assets().then(data => {
      if (data.success) {
        set_files(data.files);
        set_total_num(data.count);
      }
    });
  }, []);

  return (
    <StyledComponent>
      <Workflow>
        <HeadText01>Check your NFTs to upload</HeadText01>
        <ImagePart01>
          <ShowImage01
            onClick={() => {
              set_flag_full(!flag_full);
            }}
          >
            {select_num > 0 ? (
              flag_full === false ? (
                files.length && (
                  <img
                    src={`/config_metadata/metadata_assets/${
                      files[select_num - 1]?.image
                    }`}
                    width={'200px'}
                    height={'200px'}
                    style={{ borderRadius: '0px 0px 0px 0px' }}
                    alt=""
                  />
                )
              ) : (
                files.length && (
                  <Box display={'flex'} justifyContent="center" alignItems={"center"} position="absolute" top={'0px'} width={"100%"} height={'100%'} bgcolor={"rgba(194, 191, 191, 0.5)"}>
                    <img
                      src={`/config_metadata/metadata_assets/${
                        files[select_num - 1]?.image
                      }`}
                      style={{
                        width: '600px',
                        height: '600px',
                        borderRadius: '0px 0px 0px 0px',
                      }}
                      alt=""
                    />
                  </Box>
                )
              )
            ) : (
              <>can't find image</>
            )}
            {/* <input
              style={{ display: 'none' }}
              ref={inputRef}
              type="file"
              // directory="true"
              // webkitdirectory="true"
              multiple
              onChange={handleFileChange}
            /> */}
            {/* <UploadBtn01 onClick={handleClick}>UPLOAD</UploadBtn01> */}
          </ShowImage01>
          <Select01>
            <ButtonSelect01
              onClick={() => {
                let temp = select_num;
                temp = temp - 1;
                if (files) {
                  if (temp < 1) {
                    set_select_num(total_num);
                  } else set_select_num(temp);
                } else {
                  set_select_num(1);
                }
              }}
            >
              <MdNavigateBefore />
            </ButtonSelect01>
            <SelectNumber01>
              <InputNumber01
                component={'input'}
                {...{ value: select_num }}
                {...{ type: 'number' }}
                onChange={e => {
                  let temp;
                  temp = parseInt((e.target as HTMLInputElement).value);
                  if (temp > total_num) {
                    alert('Selected number is greater than count!');
                    select_num(1);
                    return;
                  }

                  set_select_num(temp);
                }}
              ></InputNumber01>
              /{total_num}
            </SelectNumber01>
            <ButtonSelect01
              onClick={() => {
                let temp = select_num;
                temp = temp + 1;
                if (files) {
                  if (temp > total_num) {
                    set_select_num(1);
                  } else {
                    set_select_num(temp);
                  }
                } else {
                  set_select_num(1);
                }
              }}
            >
              <MdNavigateNext />
            </ButtonSelect01>
          </Select01>
        </ImagePart01>

        <PropertyPart01>
          <Left01>
            <Text01>
              image:<Text02>{files[select_num - 1]?.image}</Text02>
            </Text01>
            <Text01>
              name:<Text02>{files[select_num - 1]?.name}</Text02>
            </Text01>
            <Text01>
              symbol:<Text02>{files[select_num - 1]?.symbol}</Text02>
            </Text01>
            <Text01>
              description:<Text02>{files[select_num - 1]?.description}</Text02>
            </Text01>
            <Text01>
              external_url:
              <Text02>{files[select_num - 1]?.external_url}</Text02>
            </Text01>
          </Left01>
          <Right01>
            <Text01>
              seller_fee_basis_points:
              <Text02>{files[select_num - 1]?.seller_fee_basis_points}</Text02>
            </Text01>
            <Text01>
              edition:<Text02>{files[select_num - 1]?.edition}</Text02>
            </Text01>
            <Text01>
              creators:
              <Text02>
                {show_short(
                  files[select_num - 1]?.properties.creators[0].address,
                )}
              </Text02>
            </Text01>
            <Text01>
              attributes:{'\u00a0'}*trait_type:
              <Text02>{files[select_num - 1]?.attributes[0].trait_type}</Text02>
              {'\u00a0'}*value:
              <Text02>{files[select_num - 1]?.attributes[0].value}</Text02>
            </Text01>
            <Text01>
              collection:
              {'\u00a0'}*name:
              <Text02>{files[select_num - 1]?.collection.name}</Text02>
              {'\u00a0'}*family:
              <Text02>{files[select_num - 1]?.collection.family}</Text02>
            </Text01>
          </Right01>
        </PropertyPart01>
        <GeneratePart>
          <GenerateButton onClick={() => next_step()}>Next Step</GenerateButton>
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
  /* border-radius: 8px; */
  flex-direction: column;
  align-items: center;
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

const Select01 = styled(Box)`
  display: flex;
  width: 200px;
  margin-top: auto;
  margin-bottom: auto;
  justify-content: space-between;
  align-items: center;
`;

const ButtonSelect01 = styled(Box)`
  display: flex;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  background-color: #54c3e7;
  /* border-radius: 8px; */
  font-weight: bold;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: #176180;
    background-color: white;
  }
`;

const SelectNumber01 = styled(Box)`
  display: flex;
  height: 35px;
  width: 120px;
  background-color: #54c3e7;
  color: white;
  /* border-radius: 8px; */
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
const InputNumber01 = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 26px;
  background-color: #54c3e7;
  /* border-radius: 8px; */
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
  color: white;
  outline: none;
  border: 2px solid white;
`;

const ImagePart01 = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 40%;
  margin-top: auto;
  margin-bottom: auto;
`;

const ShowImage01 = styled(Box)`
  display: flex;
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  /* border-radius: 8px; */
  /* background-color: white; */
  border: 2px solid #54c3e7;
  background-color: black;
  cursor: pointer;
  transition: .5s;
  &:hover{
    box-shadow: rgb(255 255 255) 0px 0px 10px;
    border: 2px solid white;
  }
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

const PropertyPart01 = styled(Box)`
  display: flex;
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Left01 = styled(Box)`
  display: flex;
  width: 45%;
  flex-direction: column;
  justify-content: center;
`;

const Right01 = styled(Box)`
  display: flex;
  width: 45%;
  flex-direction: column;
  justify-content: center;
`;

const Text01 = styled(Box)`
  display: flex;
  width: 100%;
  color: #54c3e7;
  font-size: 1.1rem;
  margin-top: 2px;
  margin-bottom: 2px;
  align-items: center;
`;

const Text02 = styled(Box)`
  display: flex;
  color: white;
  font-size: 1.3rem;
  margin-left: 10px;
`;

// const UploadBtn01 = styled(Box)`
//   display: flex;
//   width: 60px;
//   height: 200px;
//   border-radius: 0px 8px 8px 0px;
//   color: white;
//   background-color: #0d9d31;
//   justify-content: center;
//   align-items: center;
//   writing-mode: vertical-rl;
//   text-orientation: upright;
//   font-size: 1.2rem;
//   font-weight: bold;
//   &:hover {
//     cursor: pointer;
//     color: #0d9d31;
//     background-color: white;
//     transition: 0.5s;
//   }
// `;

// declare module 'react' {
//   interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
//     // extends React's HTMLAttributes
//     directory?: string;        // remember to make these attributes optional....
//     webkitdirectory?: string;
//   }
// }

export default Preview;
