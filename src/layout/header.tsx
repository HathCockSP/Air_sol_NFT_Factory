import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import IMG_LOGO from '../assets/images/air_logo.png';
import { useEffect, useMemo, useState } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import jwtDecode from 'jwt-decode'
import { shortenAddress} from '../candy-machine'

import * as anchor from '@project-serum/anchor';

const Header = () => {
  const [flag_mint_dropmenu, set_flag_mint_dropmenu] = useState<any>(false);
  const wallet:any = useWallet();
  const [balance, setBalance] = useState<any>();

  const [username, setUsername] = useState<any>();

  let navigate = useNavigate();
  const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
  const connection = new anchor.web3.Connection(
    rpcHost ? rpcHost : anchor.web3.clusterApiUrl('devnet'),
  );

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet;
  }, [wallet]);

  useEffect(() => {
    (async () => {
      if (anchorWallet) {
        const balance = await connection.getBalance(anchorWallet!.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [anchorWallet, connection]);

  useEffect(()=>{
    const user1:any = localStorage.getItem('jwtToken');
    setUsername((jwtDecode(user1) as any).username);
  }, [])
  return (
    <StyledComponent>
      <LeftPart01>
        <LogoPart>
          <Box display={'flex'} alignItems={'center'}>
            <img src={IMG_LOGO} height="50px" alt="" />
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            ml="20px"
            fontSize={'1.5rem'}
          >
            ADVENTURE IN REALITY
          </Box>
        </LogoPart>
      </LeftPart01>
      <LinkPart>
        <Link01
          onClick={() => {
            navigate('/preview');
          }}
        >
          HOME
        </Link01>
        <Link01
          onClick={() => {
            set_flag_mint_dropmenu(!flag_mint_dropmenu);
            // navigate('/');
          }}
          onMouseLeave={() => {
            set_flag_mint_dropmenu(false);
          }}
        >
          MINT
          {flag_mint_dropmenu ? (
            <DropMenu>
              <DropMenuBox01
                borderBottom={'2px solid #c8c9c9'}
                onClick={() => {
                  navigate('/generate_config');
                }}
              >
                Generating
              </DropMenuBox01>
              <DropMenuBox01
                borderBottom={'2px solid #c8c9c9'}
                onClick={() => {
                  navigate('/choose_assets');
                }}
              >
                Choosing
              </DropMenuBox01>
              <DropMenuBox01
                onClick={() => {
                  navigate('/cms_batch');
                }}
              >
                CMS Batch
              </DropMenuBox01>
            </DropMenu>
          ) : (
            <></>
          )}
        </Link01>
        <Link01
          onClick={() => {
            navigate('/job');
          }}
        >
          JOB VIEW
        </Link01>
        <Link01
          onClick={() => {
            navigate('/preview');
          }}
        >
          MISC
        </Link01>
        <Link01
          onClick={() => {
            navigate('/setting');
          }}
        >
          SETTING
        </Link01>
      </LinkPart>
      <RightPart01>
        <ConnectPart>
          {!wallet.connected ? (
            <ConnectButton>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                fontSize={'1.5rem'}
                fontWeight={'bold'}
              >
                <MdAccountBalanceWallet />
              </Box>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                ml={'5px'}
              >
                Connect
              </Box>
            </ConnectButton>
          ) : (
            <ConnectButton>{shortenAddress(wallet.publicKey)} || {balance.toLocaleString()}SOL</ConnectButton>
          )}
          <SignOutBtn
            onClick={() => {
              localStorage.removeItem('jwtToken');
              navigate('/signin');
              window.location.reload();
            }}
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              ml={'5px'}
            >
              {username}
            </Box>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              fontSize={'1.7rem'}
              fontWeight={'bold'}
              ml={'5px'}
            >
              <RiLogoutBoxRLine />
            </Box>
          </SignOutBtn>
        </ConnectPart>
      </RightPart01>
    </StyledComponent>
  );
};

const StyledComponent = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  color: white;
  background-color: #176180;
`;

const ConnectButton = styled(WalletDialogButton)`
  width: 200px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 5px;
  color: white !important;
  border-radius: 0px !important;
  font-size: 1.1rem !important;
  background-color: #54c3e7 !important;
  font-weight: bold !important;
  &:hover {
    transition: 0.5s;
    color: #176180 !important;
    background-color: white !important;
  }
`;

const SignOutBtn = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 50px;
  color: white;
  font-size: 1.3rem;
  margin-left: 20px;
  /* background-color: #54c3e7 ; */
  font-weight: bold;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    text-shadow: 0 0px 10px white;
  }
`;

const LeftPart01 = styled(Box)`
  display: flex;
  flex: 1.5;
  align-items: center;
`;

const RightPart01 = styled(Box)`
  display: flex;
  flex: 1.5;
  align-items: center;
`;

const LogoPart = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 100px;
`;

const LinkPart = styled(Box)`
  display: flex;
  flex: 3;
  justify-content: center;
  align-items: center;
`;
const ConnectPart = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  margin-right: 100px;
`;

const Link01 = styled(Box)`
  display: flex;
  position: relative;
  flex: 1;
  width: 100%;
  height: 70px;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    transition: 0.3s;
    color: #54c3e7;
  }
`;

const DropMenu = styled(Box)`
  display: flex;
  z-index: 10;
  position: absolute;
  background-color: white;
  color: #176180;
  font-size: 1.5rem;
  width: 100%;
  height: 150px;
  justify-content: center;
  align-items: center;
  bottom: -150px;
  flex-direction: column;
`;

const DropMenuBox01 = styled(Box)`
  display: flex;
  width: 80%;
  flex: 1;
  justify-content: center;
  align-items: center;
  &:hover {
    transition: 0.5s;
    color: #54c3e7;
    /* font-weight: bold; */
  }
`;
export default Header;
