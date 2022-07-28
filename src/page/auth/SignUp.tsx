import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import IMG_LOGO01 from '../../assets/images/air_logo.png';
import { FaRegAddressCard } from 'react-icons/fa';
import { useState } from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { signup } from '../../redux/actions/auth';

const SignUp = () => {
  let navigate = useNavigate();
  const [username, set_username] = useState<any>('');
  const [email, set_email] = useState<any>('');
  const [password, set_password] = useState<any>('');
  const [repassword, set_repassword] = useState<any>('');

  const sign_in = () => {
    navigate('/signin');

  };
  const sign_up = () => {
    console.log();
    if (username === '') {
      NotificationManager.error('Type your username!', 'Error!', 3000);
      return;
    }
    if (email === '') {
      NotificationManager.error('Type your email!', 'Error!', 3000);
      return;
    }
    if (email !== '') {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        NotificationManager.error('Invaild email address!', 'Error!', 3000);
        return;
      }
    }
    if (password === '') {
      NotificationManager.error('Type your password!', 'Error!', 3000);
      return;
    }
    if (repassword === '') {
      NotificationManager.error(
        'Type your password to confirm!',
        'Error!',
        3000,
      );
      return;
    }
    if (password !== repassword) {
      NotificationManager.error(
        "Password doesn't match! Check your password again!",
        'Error!',
        3000,
      );
      return;
    }
    let signup_data: any = {
      username: username,
      email: email,
      password: password,
      permission: false,
    };
    signup(signup_data).then(flag_success => {
      if (flag_success === 'success') {
        NotificationManager.info(
          'Signed up, please wait for approval.',
          'Success!',
          3000,
        );
        navigate('/signin');

        // window.scrollTo(0, 0);
      } else if (flag_success === 'same_user') {
        NotificationManager.warning(
          'Username already exists, try again!',
          'Warning!',
          3000,
        );
        set_username('');
        return;
      } else if (flag_success === 'same_email') {
        NotificationManager.warning(
          'Email already exists, try again!',
          'Warning!',
          3000,
        );
        set_email('');
        return;
      }
    });
  };

  return (
    <StyledComponent>
      <Workflow>
        <LogoMark01>
          <img src={IMG_LOGO01} alt="" />
        </LogoMark01>
        <HeadText01>Sign up to AiR NFT factory</HeadText01>
        <Input01
          component={'input'}
          {...{ placeholder: 'Username' }}
          {...{ value: username }}
          onChange={(e: any) => {
            set_username(e.target.value);
          }}
        ></Input01>
        <Input01
          component={'input'}
          {...{ placeholder: 'Email' }}
          {...{ value: email }}
          onChange={(e: any) => {
            set_email(e.target.value);
          }}
        ></Input01>
        <Input01
          component={'input'}
          {...{ placeholder: 'Password' }}
          {...{ type: 'password' }}
          {...{ value: password }}
          onChange={(e: any) => {
            set_password(e.target.value);
          }}
        ></Input01>
        <Input01
          component={'input'}
          {...{ placeholder: 'Confirm password' }}
          {...{ type: 'password' }}
          {...{ value: repassword }}
          onChange={(e: any) => {
            set_repassword(e.target.value);
          }}
        ></Input01>
        {/* <ForgotPart01>
          Forgot password?
        </ForgotPart01> */}
        <SignUpPart01>
          <Box
            display={'flex'}
            fontSize="1.1rem"
            alignItems="center"
            justifyContent={'center'}
          >
            Already have an account?
          </Box>
          <SignUpBox
            onClick={() => {
              sign_in();
            }}
          >
            Sign In
          </SignUpBox>
        </SignUpPart01>
        <GeneratePart>
          <GenerateButton
            onClick={() => {
              sign_up();
            }}
          >
            <Box display={'flex'} alignItems="center" justifyContent={'center'}>
              <FaRegAddressCard fontSize={'1.6rem'} fontWeight="bolder" />
            </Box>
            <Box
              display={'flex'}
              ml="10px"
              alignItems="center"
              justifyContent={'center'}
            >
              Sign Up
            </Box>
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
  width: 26%;
  /* height: 60%; */
  color: white;
  background-color: rgba(23, 97, 128, 0.85);
  /* border-radius: 20px; */
  flex-direction: column;
  align-items: center;
`;

const LogoMark01 = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 70px;
`;
const Input01 = styled(Box)`
  display: flex;
  width: 70%;
  border-radius: 0px;
  border: none;
  height: 50px;
  margin-top: 15px;
  font-size: 1.3rem;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid white;
  color: #176180;
  transition: 0.3s;
  &:hover {
    border: 2px solid #54c3e7;
  }
`;
const HeadText01 = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  font-size: 1.3rem;
  font-weight: bold;

  color: white;
`;

const GeneratePart = styled(Box)`
  display: flex;
  width: 100%;

  justify-content: center;
  align-items: center;
`;

const GenerateButton = styled(Box)`
  display: flex;
  width: 70%;
  height: 50px;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #54c3e7;
  margin-top: 30px;
  margin-bottom: 50px;
  /* border-radius: 8px; */
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    color: #176180;
    background-color: white;
  }
`;

const SignUpPart01 = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

// const ForgotPart01 = styled(Box)`
//   display: flex;
//   width: 70%;
//   justify-content: flex-end;
//   align-items: center;
//   margin-top: 15px;
//   font-size: 1.1rem;
//   cursor: pointer;
//   &:hover {
//     transition: 0.5s;
//     text-shadow: 0 0px 5px white;
//   }
// `;

const SignUpBox = styled(Box)`
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
  margin-left: 20px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    text-shadow: 0 0px 5px white;
  }
`;
export default SignUp;
