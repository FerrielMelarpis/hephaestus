import { Config } from 'config/config';

export const getAvatarUrl = (seed: string) => {
  return `${Config.botApi.avatarUrl}/${seed}.svg`;
};
