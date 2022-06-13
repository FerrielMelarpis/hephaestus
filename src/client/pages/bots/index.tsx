import React from 'react';
import { Config } from 'config/config';
import { Container, Grid } from '@chakra-ui/react';
import type { Bot } from 'shared/types/bots';
import { BotCard } from 'components/bot_card/bot_card';
import { Header } from 'components/header/header';
import { GetServerSideProps } from 'next';

type PageProps = {
  bots: Bot[];
};
const Page = ({ bots }: PageProps) => {
  return (
    <Container maxWidth="container.xl">
      <Header />
      <Grid
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gridAutoRows="max-content"
        gap={4}
        marginTop={12}
      >
        {bots.map((bot) => (
          <div key={bot.id}>
            <BotCard {...bot} />
          </div>
        ))}
      </Grid>
    </Container>
  );
};

const isStringArray = (args: any | any[]): args is string[] =>
  Array.isArray(args) && typeof args[0] === 'string';

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context,
) => {
  const apiUrl = new URL(Config.botApi.baseUrl);
  const params = new URLSearchParams();

  Object.keys(context.query).forEach((param) => {
    const value = context.query[param];
    if (isStringArray(value)) {
      params.set(param, value.join(','));
    } else {
      params.set(param, value);
    }
  });

  apiUrl.search = params.toString();
  const res = await fetch(apiUrl.toString(), {
    headers: {
      // we need to pass this explicitly instead of using `credentials: 'same-origin'` as this is ran in server-side
      Cookie: context.req.headers.cookie,
      // Authorization: 'bearer ' + context.req.cookies['session'], // can also use this
    },
  });

  if (!res.ok) {
    return { notFound: true };
  }

  const bots = await res.json();

  return { props: { bots } };
};

export default Page;
