import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import type { Bot } from 'shared/types/bots';
import { getAvatarUrl } from 'shared/utils';

type BotCardProps = Omit<Bot, 'id'> & {
  // todo: link cards to specific view for editing and deletion
  // url: string;
};
export const BotCard = ({ name, purpose }: BotCardProps) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      paddingY={4}
      paddingX={6}
      boxShadow="outline"
    >
      <Image src={getAvatarUrl(name)} alt={`Avatar for bot named ${name}`} />
      <Box marginTop={4}>
        <Text fontSize="lg">{name}</Text>
        <Text fontSize="md">{purpose}</Text>
      </Box>
    </Box>
  );
};
