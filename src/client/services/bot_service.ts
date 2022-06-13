import { ParsedUrlQuery } from 'querystring';
import { Bot } from 'shared/types/bots';

const BOTS_API_BASEURL = '/api/bots';

export const createBot = async (payload: Omit<Bot, 'id'>) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'same-origin' as const,
  };

  return fetch(BOTS_API_BASEURL, options);
};

export const updateBot = async (payload: Bot) => {
  const { id, ...patchObj } = payload;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patchObj),
    credentials: 'same-origin' as const,
  };

  return fetch(`${BOTS_API_BASEURL}/${id}`, options);
};

export const deleteBot = async (id: number) => {
  const options = {
    method: 'DELETE',
    credentials: 'same-origin' as const,
  };

  return fetch(`${BOTS_API_BASEURL}/${id}`, options);
};
