import { Routes, getRoutePath } from '../router';

export type HeaderMenu = {
  name: Routes;
  title: string;
  url: string;
};

export const HEADER_MENU = (): HeaderMenu[] => [
  { name: Routes.USER, title: 'Me', url: getRoutePath(Routes.USER) },
  { name: Routes.USERS, title: 'Users', url: getRoutePath(Routes.USERS) },
  { name: Routes.LOGIN, title: 'Log out', url: getRoutePath(Routes.LOGIN) }
];
