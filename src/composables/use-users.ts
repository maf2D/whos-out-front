import type { ApiUsersResponse } from '@/types/api';
import type { ToRefs } from 'vue';
import type { WidgetState } from '../components/whos-out-widget/users-page/users-page.vue';

import { useApi } from '@/composables/use-api';
import { buildQueryParams } from '@/helpers/build-query-params';
import { computed, ref } from 'vue';

// composable that gets some params and returns users based on the params
export const useUsers = ({
  skip,
  limit,
  searchStr,
  activeTab
}: ToRefs<WidgetState>) => {
  // users state
  const allFetched = ref(false);
  const users = ref<ApiUsersResponse['data'] | null>(null);

  // base api
  const { api } = useApi();

  // composable that fetches new users based on query params
  const { isFetching, error, onFetchResponse, execute } = api<ApiUsersResponse>(
    // dynamic url
    computed(
      () =>
        `/users?${buildQueryParams({
          search: searchStr.value,
          searchBy: '[firstName, lastName]',
          skip: skip.value,
          limit: limit.value,
          ...(activeTab.value === 'On Vacation' && { onVacation: true })
        })}`
    ),

    // additional settings
    { immediate: false }
  );

  // set up users
  onFetchResponse(async (response) => {
    const { data } = await response.json();

    // check if all users are fetched
    if (data.users.length < limit.value) allFetched.value = true;

    // if scrolling then adding new users to existing users
    if (skip.value > 0 && users.value) {
      users.value = {
        ...users.value,
        users: [...users.value.users, ...data.users]
      };
    }

    // just rewrite the users
    if (skip.value === 0) {
      users.value = data;
    }
  });

  return {
    users: computed(() => users.value),

    fetchUsers: execute,
    allFetched,
    isFetching,
    error
  };
};
