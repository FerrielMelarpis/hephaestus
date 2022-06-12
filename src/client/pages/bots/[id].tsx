import {
  Box,
  Button,
  Center,
  Container,
  Image,
  useToast,
} from '@chakra-ui/react';
import { Config } from 'config/config';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Bot } from 'shared/types/bots';
import { getAvatarUrl } from 'shared/utils';
import { BotForm } from 'components/bot_form/bot_form';
import { deleteBot, updateBot } from 'services/bot_service';
import { useBotForm } from 'components/bot_form/use_bot_form';
import { useRouter } from 'next/router';
import { Header } from 'components/header/header';

type PageProps = {
  bot: Bot;
};
function Page({ bot }: PageProps) {
  const toast = useToast();
  const router = useRouter();
  const { formState, dispatch } = useBotForm(bot);
  const onSave = async () => {
    try {
      const res = await updateBot({
        id: bot.id,
        name: formState.name.value,
        purpose: formState.purpose.value,
      });

      if (res.ok) {
        toast({
          title: 'Bot updated',
          description: 'Bot has been updated.',
          status: 'success',
          isClosable: true,
        });
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
  const onDelete = async () => {
    await deleteBot(bot.id);
    router.push('/bots');
  };
  const formSubmitControls = (
    <>
      <Button type="submit" onClick={onSave}>
        Save
      </Button>
      <Button onClick={onDelete}>Delete</Button>
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
          <Image
            src={getAvatarUrl(formState.name.value)}
            alt={`Avatar for bot named ${formState.name.value}`}
          />
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
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context,
) => {
  if (context.params?.id == null) {
    return { notFound: true };
  }

  const res = await fetch(`${Config.botApi.baseUrl}/${context.params.id}`);

  if (!res.ok) {
    return { notFound: true };
  }

  const bot = await res.json();

  return { props: { bot } };
};

export default Page;
