import React, { PropsWithChildren, useState } from 'react';
import {
  Flex,
  IconButton,
  Link,
  Stack,
  Text,
  TextProps,
  useColorMode,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

type MenuToggleProps = {
  isOpen: boolean;
  toggle(): void;
};
const MenuToggle = ({ isOpen, toggle }: MenuToggleProps) => {
  return (
    <IconButton
      display={{ sm: 'none' }}
      aria-label={`${isOpen ? 'Close' : 'Open'} menu`}
      icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
      onClick={toggle}
    />
  );
};

type MenuItemProps = PropsWithChildren<{
  to: string;
  textProps?: TextProps;
}>;
const MenuItem = ({ children, to, textProps }: MenuItemProps) => {
  return (
    <NextLink href={to} passHref>
      <Link>
        <Text display="block" fontSize="2xl" {...textProps}>
          {children}
        </Text>
      </Link>
    </NextLink>
  );
};

type MenuLinksProps = {
  isOpen: boolean;
};
const MenuLinks = ({ isOpen }: MenuLinksProps) => {
  return (
    <Stack
      spacing={6}
      align="center"
      display={{ base: isOpen ? 'flex' : 'none', sm: 'flex' }}
      justify={['center', 'space-between', 'flex-end', 'flex-end']}
      direction={{ base: 'column', sm: 'row' }}
      paddingTop={[4, 4, 0, 0]}
    >
      <MenuItem to="/bots">Bots</MenuItem>
      <MenuItem to="/bots/new">New Bot</MenuItem>
    </Stack>
  );
};

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="toggle color mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
    />
  );
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      width="full"
      marginBottom={16}
      paddingY={2}
      boxShadow="2xl"
    >
      <MenuToggle isOpen={isOpen} toggle={toggle} />
      <MenuLinks isOpen={isOpen} />
      <ColorModeToggle />
    </Flex>
  );
};
