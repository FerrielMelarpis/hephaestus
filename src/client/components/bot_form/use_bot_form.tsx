import { Reducer, useReducer } from 'react';
import { Bot } from 'shared/types/bots';

export type FormState = {
  name: {
    value: string;
    error?: string;
  };
  purpose: {
    value: string;
    error?: string;
  };
};
const initialFormState = { name: '', purpose: '' };
const init = (initialFormState: {
  name: string;
  purpose: string;
}): FormState => {
  return {
    name: {
      value: initialFormState.name,
      error: undefined,
    },
    purpose: {
      value: initialFormState.purpose,
      error: undefined,
    },
  };
};

type UpdateNameAction = {
  type: 'UPDATE_NAME';
  payload: Partial<FormState['name']>;
};
type UpdatePurposeAction = {
  type: 'UPDATE_PURPOSE';
  payload: Partial<FormState['purpose']>;
};
type ResetFormAction = {
  type: 'RESET';
};
export type FormStateAction =
  | UpdateNameAction
  | UpdatePurposeAction
  | ResetFormAction;
const reducer: Reducer<FormState, FormStateAction> = (state, action) => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...state, name: { ...state.name, ...action.payload } };
    case 'UPDATE_PURPOSE':
      return { ...state, purpose: { ...state.purpose, ...action.payload } };
    case 'RESET':
      return init(initialFormState);
    default:
      throw new Error('unreachable');
  }
};

export const useBotForm = (bot?: Omit<Bot, 'id'>) => {
  const [formState, dispatch] = useReducer(
    reducer,
    { ...initialFormState, ...bot },
    init,
  );

  return { formState, dispatch };
};
