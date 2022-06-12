import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import type { Bot } from 'shared/types/bots';
import { getAvatarUrl } from 'shared/utils';
import Link from 'next/link';

export const BotCard = ({ id, name, purpose }: Bot) => {
  return (
    <Box
      maxW="sm"
      borderRadius="lg"
      overflow="hidden"
      paddingY={4}
      paddingX={6}
      boxShadow="outline"
    >
      <Link key={id} href="/bots/[id]" as={`/bots/${id}`}>
        <a>
          <Image
            src={getAvatarUrl(name)}
            alt={`Avatar for bot named ${name}`}
          />
          <Box marginTop={4}>
            <Text fontSize="xl">{name}</Text>
            <Text fontSize="md">{purpose}</Text>
          </Box>
        </a>
      </Link>
    </Box>
  );
};
