import React from 'react';
import { Config } from 'config/config';
import { Container, Grid } from '@chakra-ui/react';
import type { Bot } from 'shared/types/bots';
import { BotCard } from 'components/bot_card/bot_card';

type PageProps = {
  bots: Bot[];
};
function Page({ bots }: PageProps) {
  return (
    <Container maxWidth="container.xl">
      <Grid
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap={4}
        marginTop={12}
      >
        {bots.map((bot) => (
          <BotCard key={bot.id} name={bot.name} purpose={bot.purpose} />
        ))}
      </Grid>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch(Config.botApi.baseUrl + '/');
  const bots = await res.json();

  return { props: { bots } };
}

export default Page;
