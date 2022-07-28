import { Box } from '@material-ui/core';
// import { useRef } from 'react';
import styled from 'styled-components';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { getAssets } from '../../redux/actions/production';
import PropertyText from '../../components/production/PropertyText';
import PropertyObjectText from '../../components/production/PropertyObjectText';

const ReviewBatch = ({
  id,
  setFlagStep,
  sBatchData,
  set_flag_step_review,
}: any) => {
  // const inputRef = useRef<any>(null);
  const [select_num, set_select_num] = useState<any>(1);
  const [total_num, set_total_num] = useState<any>(0);
  const [files, set_files] = useState<any>([]);
  const [flag_full, set_flag_full] = useState<any>(false);

  const next_step = () => {
    set_flag_step_review(2);
    setFlagStep(3);
  };

  useEffect(() => {
    if(id!==null)
    {
      getAssets(id).then(data => {
        if (data.success) {
          set_files(data.files);
          set_total_num(data.count);
        }
      });
    }
    else{
      return;
    }
  }, []);

  return (
    <StyledComponent>
      <Workflow>
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
                    src={sBatchData[select_num - 1].image}
                    width={'200px'}
                    height={'200px'}
                    alt=""
                  />
                )
              ) : (
                files.length && (
                  <Box
                    display={'flex'}
                    justifyContent="center"
                    alignItems={'center'}
                    position="absolute"
                    top={'0px'}
                    left={'0px'}
                    width={'100%'}
                    height={'100%'}
                    bgcolor={'rgba(194, 191, 191, 0.7)'}
                  >
                    <img
                      src={sBatchData[select_num - 1].image}
                      style={{
                        width: '600px',
                        height: '600px',
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
          <PropertyText
            firstStr={'image'}
            secondStr={files[select_num - 1]?.image}
          />
          <PropertyText
            firstStr={'name'}
            secondStr={files[select_num - 1]?.name}
          />
          <PropertyText
            firstStr={'symbol'}
            secondStr={files[select_num - 1]?.symbol}
          />
          <PropertyText
            firstStr={'description'}
            secondStr={files[select_num - 1]?.description}
          />
          <PropertyText
            firstStr={'external_url'}
            secondStr={files[select_num - 1]?.external_url}
          />
          <PropertyText
            firstStr={'seller_fee_basis_points'}
            secondStr={files[select_num - 1]?.seller_fee_basis_points}
          />
          <PropertyText
            firstStr={'edition'}
            secondStr={files[select_num - 1]?.edition}
          />
          <PropertyObjectText
            firstStr={'properties_creators'}
            content={files[select_num - 1]?.properties.creators}
            dataFor={'creators'}
          />
          <PropertyObjectText
            firstStr={'attributes'}
            content={files[select_num - 1]?.attributes}
            dataFor={'attributes'}
          />
          <PropertyObjectText
            firstStr={'properties_files'}
            content={files[select_num - 1]?.properties.files}
            dataFor={'files'}
          />
          {/* <PropertyObjectText
            firstStr={'properties_creators_files'}
            secondStr={"uri"}
            thirdStr={"type"}
            content={files[select_num - 1]?.properties.creators}
          />
          <PropertyObjectText
            firstStr={'attributes'}
            secondStr={"trait_type"}
            thirdStr={"value"}
            content={files[select_num - 1]?.attributes}
          /> */}
          {/* <Left01>
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
          </Left01>
          <Right01>
            <Text01>
              external_url:
              <Text02>{files[select_num - 1]?.external_url}</Text02>
            </Text01>
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
          </Right01> */}
        </PropertyPart01>
      </Workflow>
      <GeneratePart>
        <GenerateButton onClick={() => next_step()}>Next Step</GenerateButton>
      </GeneratePart>
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

const Workflow = styled(Box)`
  display: flex;
  flex: 1;
  width: 90%;
  height: 100%;
  color: white;
  background-color: #176180;
  /* border-radius: 8px; */
  flex-direction: column;
  align-items: center;
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
  &:hover {
    transition: 0.5s;
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
  height: 250px;
`;

const ShowImage01 = styled(Box)`
  display: flex;
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  /* border-radius: 8px; */
  /* background-color: white; */
  border: 2px solid #176180;
  background-color: #176180;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    box-shadow: rgb(255 255 255) 0px 0px 10px;
    border-radius: 8px;
    background-color: white;
    border: 2px solid white;
  }
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

const PropertyPart01 = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: auto;
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  color: white;
  overflow-y: auto;
`;

const Left01 = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const Right01 = styled(Box)`
  display: flex;
  flex: 1;
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

export default ReviewBatch;
