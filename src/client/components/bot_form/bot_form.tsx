import React, { Dispatch, FormEvent, ReactNode } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  ButtonGroup,
  Textarea,
} from '@chakra-ui/react';
import { FormState, FormStateAction } from './use_bot_form';

type BotFormProps = {
  formState: FormState;
  dispatch: Dispatch<FormStateAction>;
  formSubmitControls: ReactNode;
};
export const BotForm = ({
  formState,
  dispatch,
  formSubmitControls,
}: BotFormProps) => {
  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const { value } = event.target;

    // todo: can be extracted to a validation service
    let error = undefined;
    if (value.length === 0) {
      error = 'Name is required.';
    } else if (!/^[a-z\d]+$/i.test(value)) {
      error = 'Name should be alphanumeric.';
    }

    dispatch({ type: 'UPDATE_NAME', payload: { value, error } });
  };

  const handlePurposeChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const { value } = event.target;

    let error = undefined;
    if (value.length === 0) {
      error = 'Purpose is required.';
    }

    dispatch({ type: 'UPDATE_PURPOSE', payload: { value, error } });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl isRequired isInvalid={formState.name.error !== undefined}>
          <FormLabel htmlFor="bot-name">Name</FormLabel>
          <Input
            id="bot-name"
            placeholder="Bot name"
            size="md"
            value={formState.name.value}
            onChange={handleNameChange}
          />
          <FormErrorMessage>{formState.name.error}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={formState.purpose.error !== undefined}
        >
          <FormLabel htmlFor="bot-purpose">Purpose</FormLabel>
          <Textarea
            id="bot-purpose"
            placeholder="Bot purpose"
            value={formState.purpose.value}
            onChange={handlePurposeChange}
          />
          <FormErrorMessage>{formState.purpose.error}</FormErrorMessage>
        </FormControl>
      </Stack>
      <ButtonGroup variant="outline" spacing="6" marginTop="6">
        {formSubmitControls}
      </ButtonGroup>
    </form>
  );
};
