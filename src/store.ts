import type { User } from './types/api';
import {
  createGlobalState,
  StorageSerializers,
  useStorage
} from '@vueuse/core';
import { reactive } from 'vue';

export enum Pages {
  LOGIN = 'login',
  REGISTER = 'register',
  USERS = 'users',
  USER = 'user'
}

type ActivePage = {
  name: Pages;
  id?: number;
};

export const useStore = createGlobalState(() => {
  // current active page
  const activePage = reactive<ActivePage>({
    name: Pages.LOGIN,
    id: 0
  });

  // a user ref that is dynamically saved in local storage
  const user = useStorage<User | null>('whos-out-user', null, undefined, {
    serializer: StorageSerializers.object
  });

  const activePageUpdate = ({ name, id = 0 }: ActivePage) => {
    activePage.name = name;
    activePage.id = id;
  };

  const userUpdate = (newUser: User | null) => (user.value = newUser);

  return {
    activePage,
    activePageUpdate,
    user,
    userUpdate
  };
});
