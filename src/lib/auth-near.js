import { Context, createContext, useContext, useEffect, useState } from 'react';
// Add this for near login auth
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import getConfig from "../config/near.config";

import { addUser } from '../utils/db';
import firebase from './firebase';
// import { answerQuestion } from '../../contract/src/nearmock/assembly';

// Adding user account
/*
const formatAuthState = (user: firebase.User): isAuth => ({
  uid: user.uid,
  setAccountId: accountId
});
*/

//Add near code here

const nearConfig = getConfig("testnet");
const AppContext = createContext({});
export const useAuth = () => useContext(AppContext);

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [account, setAccount] = useState(null);
  const [mainContract, setMainContract] = useState(null);
  const [walletConnection, setWalletConnection] = useState(null);
  const [addQuestionTitle, setaddQuestionTitle] = useState(null);
  const [triedEager, setTriedEager] = useState(false);



  
  const initNear = async () => {
    const near = await connect(
      Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig)
    );
    const walletConnection = new WalletConnection(near);
    const account = walletConnection.account();
    const contract = await new Contract(account, nearConfig.contractName, {
      viewMethods: ["get_contracts_by_owner", "get_question_contracts"],
      changeMethods: ["create_new_question_contract"],
    });

    return {
      walletConnection,
      accountId: walletConnection.getAccountId(),
      contract,
      account,
    };
  };

  const getContractQuestion = async () => {
    if (mainContract && accountId) {
      const Question = await mainContract.get_contracts_by_owner({
        owner_id: accountId,
      });
      if (Question.length > 0) {
        const _contract = await connectContract(Question[0]);
        return _contract;
      }
    }
  };

  const connectContract = async (contractName) => {
    console.log("Connecting to contract:", contractName);
    const near = await connect(
      Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig)
    );
    const walletConnection = new WalletConnection(near);
    const account = walletConnection.account();

    const contract = await new Contract(account, contractName, {
      viewMethods: [
        "getListQuestion",
        "getAuthorByQuestion",
        "getAnswer",
        "answerQuestion"
      ],
      changeMethods: ["addQuestionTitle"],
    });

    return contract;
  };

/*

  const handleAuthChange = async (authState: firebase.User | null) => {
    if (!authState) {
      triedEager(false);
      return;
    }
    const formattedAuth = formatAuthState(authState);
    setAuth(formattedAuth);
    triedEager(false);
  };
*/

  const login = (contractName) => {
    if (!walletConnection) {
      return;
    }
    walletConnection.requestSignIn(contractName ?? nearConfig.contractName, "iMock App");
    // walletConnection.requestSignIn({
    //   contractId: nearConfig.contractName,
    //   successUrl: `${process.env.domain}/user-dashboard`,
    //   failureUrl: process.env.domain,
    // });
    // Added this features
    // const authUser = formatAuthState(response.user);
    // await addUser({ ...authUser, provider });
  };

  const logout = () => {
    walletConnection.signOut();
    window.location.replace("/");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      initNear()
        .then(({ walletConnection, accountId, contract, account }) => {
          setWalletConnection(walletConnection);
          setMainContract(contract);
          if (walletConnection.isSignedIn()) {
            setIsAuth(true);
            setAccountId(accountId);
            setAccount(account);
          }
        })
        .finally(() => {
          setTriedEager(true);
        });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        networkId: nearConfig.networkId,
        isAuth,
        login,
        logout,
        accountId,
        mainContract,
        account,
        connectContract,
        walletConnection,
        addQuestionTitle,
        getContractQuestion,
        triedEager,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AuthProvider;
