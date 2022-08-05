import { Box } from '@material-ui/core';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdAddBox } from 'react-icons/md';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { BsImages } from 'react-icons/bs';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { generate_metadata, upload_images } from '../redux/actions/generate';

const GenerateMetadata = () => {
  let navigate = useNavigate();
  const [name, set_name] = useState<any>('');
  const [symbol, set_symbol] = useState<any>('');
  const [description, set_description] = useState<any>('');
  const [fee, set_fee] = useState<any>('');
  const [image_type, set_image_type] = useState<any>('png');
  const [external_url, set_external_url] = useState<any>('');
  const [edition, set_edition] = useState<any>('');
  const [cname, set_cname] = useState<any>('');
  const [cfamily, set_cfamily] = useState<any>('');

  const [creator, set_creator] = useState<Array<Object>>([]);
  const [caddress, set_caddress] = useState<any>('');
  const [cshare, set_cshare] = useState<any>('');

  const [attribute, set_addtribute] = useState<Array<Object>>([]);
  const [atype, set_atype] = useState<any>('');
  const [avalue, set_avalue] = useState<any>('');
  const [flag_iupload, set_flag_iupload] = useState<any>(false);
  const [count, set_count] = useState<any>(0);
  const [upload_files, set_upload_files] = useState<any>();

  useEffect(() => {
    set_count(localStorage.getItem('count'));
  }, [set_count]);

  const uploadImages = (image_files: any) => {
    if (image_files.length < count) {
      set_flag_iupload(false);
      NotificationManager.warning(
        'Number of images is less then number of json files.',
        'Alert!',
        3000,
      );
      return;
    }
    if (image_files.length > count) {
      set_flag_iupload(false);
      NotificationManager.warning(
        'Number of images is more then number of json files.',
        'Alert!',
        3000,
      );
      return;
    }
    set_flag_iupload(true);
    const formData: any = new FormData();
    for (let i = 0; i < image_files.length; i++) {
      formData.append('upload_images', image_files[i]);
    }
    set_upload_files(formData);
  };

  const generateMetadata = () => {
    let temp: Array<Object> = [];
    if (name === '') {
      NotificationManager.warning('Please input name!', 'Alert!', 3000);
      return;
    }
    if (symbol === '') {
      NotificationManager.warning('Please input symbol!', 'Alert!', 3000);
      return;
    }
    if (description === '') {
      NotificationManager.warning('Please input description!', 'Alert!', 3000);
      return;
    }
    if (fee === '') {
      NotificationManager.warning('Please input fee!', 'Alert!', 3000);
      return;
    }
    if (external_url === '') {
      NotificationManager.warning('Please input external_url!', 'Alert!', 3000);
      return;
    }
    if (cname === '') {
      NotificationManager.warning(
        'Please input collection name!',
        'Alert!',
        3000,
      );
      return;
    }
    if (cfamily === '') {
      NotificationManager.warning(
        'Please input collection family!',
        'Alert!',
        3000,
      );
      return;
    }
    if (creator.length === 0) {
      NotificationManager.warning('Please add creators!', 'Alert!', 3000);
      return;
    }
    if (attribute.length === 0) {
      NotificationManager.warning('Please add attributes!', 'Alert!', 3000);
      return;
    }

    for (var i = 0; i < count; i++) {
      temp.push({
        name: name + ' #' + i,
        symbol: symbol,
        description: description + '#' + i,
        seller_fee_basis_points: fee,
        image: i + '.' + image_type,
        external_url: external_url,
        edition: edition,
        attributes: attribute,
        properties: {
          files: [
            {
              uri: i + '.' + image_type,
              type: 'image/' + image_type,
            },
          ],
          category: 'image',
          creators: creator,
        },
        collection: {
          name: cname,
          family: cfamily,
        },
      });
    }
    if (flag_iupload === false) {
      NotificationManager.error(
        'Please upload images that are paired with json files!',
        'Error!',
        3000,
      );
      return;
    }

    generate_metadata(temp);
    navigate('/preview');
    window.scrollTo(0, 0);
  };

  const addCreator = () => {
    let temp: Array<Object> = [...creator];
    temp.push({ address: caddress, share: cshare });
    set_creator(temp);
    set_caddress('');
    set_cshare(0);
  };

  const addAttribute = () => {
    let temp: Array<Object> = [...attribute];
    temp.push({ trait_type: atype, value: avalue });
    set_addtribute(temp);
    set_atype('');
    set_avalue('');
  };
  return (
    <StyledComponent>
      <InputPanel01>
        <HeadText01>Input correct values to generate metadata file</HeadText01>
        <GridPanel>
          <GridBox01>
            <Text01>name:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ value: name }}
              {...{ placeholder: 'input name' }}
              onChange={e => {
                set_name((e.target as HTMLInputElement).value);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>symbol:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ value: symbol }}
              {...{ placeholder: 'input symbol' }}
              onChange={e => {
                set_symbol((e.target as HTMLInputElement).value);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>description:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ value: description }}
              {...{ placeholder: 'input description' }}
              onChange={e => {
                set_description((e.target as HTMLInputElement).value);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>seller_fee_basis_points:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'number' }}
              {...{
                value: fee,
              }}
              {...{ placeholder: '1000 = 10%' }}
              onChange={(e: any) => {
                if (parseInt((e.target as HTMLInputElement).value) < 0) {
                  NotificationManager.error(
                    'Must be greater than or equal to 0!',
                    'Error!',
                    3000,
                  );
                  set_fee(0);
                  return;
                }
                if (parseInt((e.target as HTMLInputElement).value) > 10000) {
                  NotificationManager.error(
                    'Must be less than or equal to 10000!',
                    'Error!',
                    3000,
                  );
                  set_fee(10000);
                  return;
                }
                if (isNaN(parseInt((e.target as HTMLInputElement).value))) {
                  set_fee(0);
                  return;
                }
                set_fee(parseInt((e.target as HTMLInputElement).value));
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>image type:</Text01>
            <Select01>
              <FormControl fullWidth>
                <Select
                  value={image_type}
                  onChange={(e: any) => {
                    set_image_type(e.target.value);
                  }}
                >
                  <MenuItem value={'png'}>png</MenuItem>
                  <MenuItem value={'jpg'}>jpg</MenuItem>
                  <MenuItem value={'bmp'}>bmp</MenuItem>
                  <MenuItem value={'gif'}>gif</MenuItem>
                </Select>
              </FormControl>
            </Select01>
            {/* <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ value: image_type }}
              onChange={e => {
                set_image_type((e.target as HTMLInputElement).value);
              }}
            ></Input01> */}
          </GridBox01>
          <GridBox01>
            <Text01>external_url:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ value: external_url }}
              {...{ placeholder: 'input external url' }}
              onChange={e => {
                set_external_url((e.target as HTMLInputElement).value);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>edition:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ value: edition }}
              {...{ placeholder: 'defalt value is 0' }}
              onChange={e => {
                set_edition((e.target as HTMLInputElement).value);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>collection name:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ value: cname }}
              {...{ placeholder: 'input collection name' }}
              onChange={e => {
                set_cname((e.target as HTMLInputElement).value);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>collection family:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ value: cfamily }}
              {...{ placeholder: 'input collection family' }}
              onChange={e => {
                set_cfamily((e.target as HTMLInputElement).value);
              }}
            ></Input01>
          </GridBox01>
        </GridPanel>
        <GridPanel01>
          <GridBox01>
            <Text01>creators:</Text01>
          </GridBox01>
          <GridBox01>
            <Text01>*address:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ value: caddress }}
              {...{ placeholder: 'input creator address' }}
              onChange={e => {
                set_caddress((e.target as HTMLInputElement).value);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>*share:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'number' }}
              {...{ value: cshare }}
              {...{ placeholder: 'default value is 100' }}
              onChange={(e: any) => {
                if (parseInt((e.target as HTMLInputElement).value) < 0) {
                  NotificationManager.error(
                    'Must be greater than or equal to 0!',
                    'Error!',
                    3000,
                  );
                  set_cshare(0);
                  return;
                }
                if (parseInt((e.target as HTMLInputElement).value) > 100) {
                  NotificationManager.error(
                    'Must be less than or equal to 100!',
                    'Error!',
                    3000,
                  );
                  set_cshare(100);
                  return;
                }
                if (isNaN(parseInt((e.target as HTMLInputElement).value))) {
                  set_cshare(0);
                  return;
                }
                set_cshare(parseInt((e.target as HTMLInputElement).value));
              }}
            ></Input01>
          </GridBox01>
          <GridBox02>
            <Button01 onClick={() => addCreator()}>
              <MdAddBox />{' '}
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                ml={'5px'}
              >
                Add
              </Box>
            </Button01>
          </GridBox02>
          {/* {creator &&
            creator.map((each:any, index) => {
              return (
                <>
                  <GridBox01>
                  </GridBox01>
                  <GridBox01>
                    <Text01>{each.address}</Text01>

                  </GridBox01>
                  <GridBox01>
                    <Text01>{each.share}</Text01>

                  </GridBox01>
                  <GridBox02>
                    <Button01 onClick={() => addCreator()}>
                      <MdAddBox />{' '}
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        ml={'5px'}
                      >
                        Add
                      </Box>
                    </Button01>
                    <Button01 onClick={() => addCreator()}>
                      <MdAddBox />{' '}
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        ml={'5px'}
                      >
                        Add
                      </Box>
                    </Button01>
                  </GridBox02>
                </>
              );
            })} */}
          <GridBox01>
            <Text01>attributes:</Text01>
          </GridBox01>
          <GridBox01>
            <Text01>*trait_type:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ value: atype }}
              {...{ placeholder: 'input attribute trait_type!' }}
              onChange={e => {
                set_atype((e.target as HTMLInputElement).value);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>*value:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ value: avalue }}
              {...{ placeholder: 'input attribute value!' }}
              onChange={e => {
                set_avalue((e.target as HTMLInputElement).value);
              }}
            ></Input01>
          </GridBox01>
          <GridBox02>
            <Button01 onClick={() => addAttribute()}>
              <MdAddBox />{' '}
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                ml={'5px'}
              >
                Add
              </Box>
            </Button01>
          </GridBox02>
        </GridPanel01>
        <GeneratePart>
          <GenerateButton
            onClick={() => {
              navigate('/generate_config');
              window.scrollTo(0, 0);
            }}
          >
            <MdNavigateBefore fontSize={'1.8rem'} fontWeight={'bolder'} />
            <Box display={'flex'}>BEFORE</Box>
          </GenerateButton>
          <label {...{ htmlFor: 'upload' }}>
            <GenerateButton>
              <BsImages fontSize={'1.5rem'} fontWeight={'bolder'} />
              <Box display={'flex'} ml="5px">
                UPLOAD
              </Box>
            </GenerateButton>
          </label>
          <input
            id={'upload'}
            type="file"
            accept=".png, .jpg, .bmp, .gif"
            multiple
            onChange={(e: any) => uploadImages(e.target.files)}
            hidden
          />
          <GenerateButton
            onClick={() => {
              generateMetadata();
              upload_images(upload_files);
            }}
          >
            <Box display={'flex'}>NEXT</Box>
            <MdNavigateNext fontSize={'1.8rem'} fontWeight={'bolder'} />
          </GenerateButton>
        </GeneratePart>
      </InputPanel01>
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

const InputPanel01 = styled(Box)`
  display: flex;
  width: 85%;
  height: 80%;
  color: white;
  background-color: #176180;
  /* border-radius: 20px; */
  flex-direction: column;
  align-items: center;
`;

const GridPanel = styled(Box)`
  display: grid;
  width: 90%;
  height: 35%;
  margin-top: auto;
  margin-bottom: auto;
  grid-template-columns: auto auto auto;
`;

const GridPanel01 = styled(Box)`
  display: grid;
  width: 90%;
  height: 25%;
  margin-top: auto;
  margin-bottom: auto;
  grid-template-columns: auto auto auto auto;
`;

const GridBox01 = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const GridBox02 = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button01 = styled(Box)`
  display: flex;
  width: 120px;
  height: 40px;
  justify-content: center;
  align-items: center;
  color: white;
  /* border-radius: 8px; */
  cursor: pointer;
  background-color: #0d9d31;
  font-size: 1.2rem;
  font-weight: bold;
  transition: 0.5s;

  &:hover {
    color: #0d9d31;
    background-color: white;
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
  width: 40%;
  margin-top: auto;
  margin-bottom: auto;
  justify-content: center;
  align-items: center;
`;

const GenerateButton = styled(Box)`
  display: flex;
  width: 150px;
  height: 60px;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #54c3e7;
  /* border-radius: 8px; */
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    color: #176180;
    background-color: white;
  }
`;
const Text01 = styled(Box)`
  display: flex;
  color: white;
  font-size: 1.3rem;
`;
const Input01 = styled(Box)`
  display: flex;
  margin-left: 10px;
  /* border-radius: 8px; */
  height: 30px;
  outline: none;
  border: 2px solid white;
  /* border: none; */
  align-items: center;
  font-size: 1.3rem;
  width: 200px;
  color: #176180;
  transition: 0.3s;
  &:hover {
    border: 2px solid #54c3e7;
  }
`;
const Select01 = styled(Box)`
  display: flex;
  margin-left: 10px;
  /* border-radius: 8px; */
  height: 30px;
  align-items: center;
  font-size: 1.3rem;
  width: 200px;
  &:hover {
    transition: 0.3s;
  }
  .MuiPaper-root {
    background-color: white !important;
    color: black !important;
  }
  .MuiInput-underline:after {
    border-bottom: 2px solid white;
  }
  .MuiFormLabel-root.Mui-focused {
    color: white;
  }
  .Mui-selected {
    font-size: 1.3rem;
    font-weight: bold;
  }
  .MuiInputBase-root {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

export default GenerateMetadata;
