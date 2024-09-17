<template>
  <widget-container text="Login">
    <form @submit="onSubmit" class="login-container">
      <Input
        v-model="email"
        v-bind="emailProps"
        name="email"
        type="email"
        placeholder="Please enter your email"
        :class="{ 'error': errors.email }"
        :error="errors.email || ''"
      />

      <Input
        v-model="password"
        v-bind="passwordProps"
        name="password"
        type="password"
        placeholder="Please enter your password"
        :class="{ 'error': errors.password }"
        :error="errors.password || ''"
      />

      <Button type="submit">Login</Button>
    </form>
  </widget-container>
</template>

<script setup lang="ts">
  import * as yup from 'yup';
  import { useRouter } from 'vue-router';
  import { useForm } from 'vee-validate';
  import { useState } from '@/composables/use-state.ts';

  import WidgetContainer from '@/lib/widget-container/widget-container.vue';
  import Input from '@/lib/input/input.vue';
  import Button from '@/lib/button/button.vue';
  import { useFetch } from '@vueuse/core';
  import { ApiUserResponse } from '@/types/api.ts';

  type LoginForm = {
    email: string;
    password: string;
  };

  const router = useRouter();
  const { loggedInUser } = useState();
  const { errors, defineField, handleSubmit } = useForm<LoginForm>({

    // default initial values
    initialValues: {
      email: 'test@gmail.com',
      password: 'test1234@M'
    },

    // schema
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required()
    })
  });

  const [email, emailProps] = defineField('email');
  const [password, passwordProps] = defineField('password');

  // login a user on a success validation
  const onSubmit = handleSubmit(async (values, actions) => {
    const {
      onFetchResponse,
      onFetchError
    } = useFetch<ApiUserResponse>('/api/v1/auth/sign-in').post(values);

    // if an invalid user then show errors
    onFetchError((error: Error) => {
      actions.setFieldError('email', error.message);
      actions.setFieldError('password', error.message);
    });

    // if success then save a user and push to the widget page
    onFetchResponse(async (response: Response) => {
      loggedInUser.value = (await response.json()).data.user;

      await router.push({ name: 'widget' });
    });
  });
</script>

<style lang="scss" scoped>
  @import 'login';
</style>