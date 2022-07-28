import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import * as anchor from '@project-serum/anchor';
import { DEFAULT_TIMEOUT } from './connection';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from '@solana/wallet-adapter-wallets';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';

import { ThemeProvider, createTheme } from '@material-ui/core';

import styled from 'styled-components';
import IMG_BACk from './assets/images/air_section_bg.png';
import Home from './page/Home';
import GenerateConfig from './page/GenerateConfig';
import GenerateMetadata from './page/GenerateMetadata';
import Preview from './page/Preview';
import ChooseAssets from './page/ChooseAssets';
import Mint from './page/Mint';
import Header from './layout/header';
import SignIn from './page/auth/SignIn';
import SignUp from './page/auth/SignUp';
import './utils/api';
import CMSBatch from './page/cms_batch/0CMSBatch';

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID!,
    );

    return candyMachineId;
  } catch (e) {
    console.log('Failed to construct CandyMachineId', e);
    return undefined;
  }
};

const candyMachineId = getCandyMachineId();
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl('devnet'),
);

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSlopeWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <StyledComponent>
              <BrowserRouter>
                {localStorage.getItem('jwtToken') ? <Header /> : <></>}
                {/* <Header />  */}
                <Routes>
                  {/* <Route  path="/" element={localStorage.getItem('jwtToken')?<Home/>:<SignIn/>} />
                  <Route
                     path="/generate_config"
                    element={localStorage.getItem('jwtToken')?<GenerateConfig/>:<SignIn/>}
                  />
                  <Route
                     path="/generate_metadata"
                    element={localStorage.getItem('jwtToken')?<GenerateMetadata/>:<SignIn/>}
                  />
                  <Route  path="/preview" element={localStorage.getItem('jwtToken')?<Preview/>:<SignIn/>} />
                  <Route  path="/mint" element={localStorage.getItem('jwtToken')?<Mint/>:<SignIn/>} />
                  <Route  path="/choose_assets" element={localStorage.getItem('jwtToken')?<ChooseAssets/>:<SignIn/>} />
                  <Route  path="/signin" element={<SignIn/>} />
                  <Route  path="/signup" element={<SignUp/>} /> */}
                  <Route path="*" element={<Navigate to="/signin" replace />} />
                  <Route path="/signin" element={localStorage.getItem('jwtToken')?<Navigate to="/" replace/>:<SignIn />} />
                  <Route path="/signup" element={localStorage.getItem('jwtToken')?<Navigate to="/" replace/>:<SignUp />} />
                  <Route
                    path="/"
                    element={
                      localStorage.getItem('jwtToken') ? (
                        <Home />
                      ) : (
                        <SignIn />
                        // <Navigate to="/signin" />
                      )
                    }
                  />
                  <Route
                    path="/generate_config"
                    element={
                      localStorage.getItem('jwtToken') ? (
                        <GenerateConfig />
                      ) : (
                        <Navigate to="/signin" />
                      )
                    }
                  />
                  <Route
                    path="/generate_metadata"
                    element={
                      localStorage.getItem('jwtToken') ? (
                        <GenerateMetadata />
                      ) : (
                        <Navigate to="/signin" />
                      )
                    }
                  />
                  <Route
                    path="/preview"
                    element={
                      localStorage.getItem('jwtToken') ? (
                        <Preview />
                      ) : (
                        <Navigate to="/signin" />
                      )
                    }
                  />
                  <Route
                    path="/mint"
                    element={
                      localStorage.getItem('jwtToken') ? (
                        <Mint />
                      ) : (
                        <Navigate to="/signin" />
                      )
                    }
                  />
                  <Route
                    path="/choose_assets"
                    element={
                      localStorage.getItem('jwtToken') ? (
                        <ChooseAssets />
                      ) : (
                        <Navigate to="/signin" />
                      )
                    }
                  />
                  <Route
                    path="/cms_batch"
                    element={
                      localStorage.getItem('jwtToken') ? (
                        <CMSBatch />
                      ) : (
                        <Navigate to="/signin"  />
                      )
                    }
                  >
                    
                  </Route>
                  {/* <Route
                    path="/mint"
                    element={
                      <Mint
                        candyMachineId={candyMachineId}
                        connection={connection}
                        txTimeout={DEFAULT_TIMEOUT}
                        rpcHost={rpcHost}
                        network={network}
                      />
                    }
                  /> */}
                </Routes>
              </BrowserRouter>
            </StyledComponent>
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

const StyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  /* justify-content: center; */
  align-items: center;
  background-image: url(${IMG_BACk});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export default App;
