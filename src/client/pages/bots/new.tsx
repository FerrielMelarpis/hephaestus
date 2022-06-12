import { Box, Button, Center, Container, useToast } from '@chakra-ui/react';
import { BotForm } from 'components/bot_form/bot_form';
import { useBotForm } from 'components/bot_form/use_bot_form';
import { Header } from 'components/header/header';
import Link from 'next/link';
import React from 'react';
import { createBot } from 'services/bot_service';

const Page = () => {
  const toast = useToast();
  const { formState, dispatch } = useBotForm();
  const onSave = async () => {
    try {
      const res = await createBot({
        name: formState.name.value,
        purpose: formState.purpose.value,
      });

      if (res.ok) {
        toast({
          title: 'Bot created',
          description: 'Bot has been created.',
          status: 'success',
          isClosable: true,
        });
        dispatch({ type: 'RESET' });
      } else {
        const jsonRes = await res.json();
        const errorMessage =
          jsonRes.error || 'An error occurred. Please try again later.';
        throw new Error(errorMessage);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: 'Error occurred',
          description: error.message,
          status: 'error',
          isClosable: true,
        });
      }
    }
  };
  const formSubmitControls = (
    <>
      <Button type="submit" onClick={onSave}>
        Save
      </Button>
      <Link href="/bots" passHref>
        <Button as="a">Cancel</Button>
      </Link>
    </>
  );

  return (
    <Container maxWidth="container.xl">
      <Header />
      <Center>
        <Box
          width="full"
          maxWidth="480px"
          overflow="hidden"
          paddingY={4}
          paddingX={6}
          borderRadius="lg"
        >
          <Box marginTop={4}>
            <BotForm
              formState={formState}
              dispatch={dispatch}
              formSubmitControls={formSubmitControls}
            />
          </Box>
        </Box>
      </Center>
    </Container>
  );
};

export default Page;
