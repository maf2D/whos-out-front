import type { User } from './types/api';
import {
  createGlobalState,
  StorageSerializers,
  useStorage
} from '@vueuse/core';

export const useStore = createGlobalState(() => {
  // a user ref that is dynamically saved in the local storage
  const user = useStorage<User | null>('whos-out-user', null, undefined, {
    serializer: StorageSerializers.object
  });

  const userUpdate = (newUser: User | null) => (user.value = newUser);

  return {
    user,
    userUpdate
  };
});
