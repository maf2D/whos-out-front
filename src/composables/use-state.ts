import { createGlobalState, StorageSerializers, useStorage } from '@vueuse/core';
import { User } from '@/types/api.ts';

export const useState = createGlobalState(() => {

  // app states
  const loggedInUser = useStorage<User | null>(
    'whos-out-user',
    null,
    undefined,
    { serializer: StorageSerializers.object }
  );

  return { loggedInUser };
});
