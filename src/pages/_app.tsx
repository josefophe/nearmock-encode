import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import  AuthProvider  from '../lib/auth-near';
// import { AppProvider, AuthProvider } from "../lib/auth-near";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider > 
          
        <Component {...pageProps} />
        
      </AuthProvider>
   
    </ChakraProvider>
  );
}

export default App;
