import { Button, Center, Container, Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import Navbar from '../common/Navbar';
import { useAuth } from '../lib/auth-near';

const signin = () => {
  const { isAuth, login } = useAuth();
  const router = useRouter();

  if (isAuth) {
    router.push((router.query.next as string) || '/');
  }

  return (
    <>
      <Navbar />
      <Container>
        <Center mt={10}>
          <VStack spacing="4">
            <Heading fontSize="3xl" mb={2}>
              Hello, Welcome to the iMock App!!
            </Heading>
            <Button  onClick={() => login()}>
            Ⓝ  Sign In with Near
            </Button>
          </VStack>
        </Center>
      </Container>
    </>
  );
};

export default signin;
