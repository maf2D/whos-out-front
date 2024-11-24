<template>
  <form @submit="onSubmit" class="login-container">
    <Input
      v-model="email"
      v-bind="emailProps"
      name="email"
      type="email"
      placeholder="Please enter your email"
      :class="{ error: errors.email }"
      :error="errors.email || ''"
    />

    <Input
      v-model="password"
      v-bind="passwordProps"
      name="passwo:w3rd"
      type="password"
      placeholder="Please enter your password"
      :class="{ error: errors.password }"
      :error="errors.password || ''"
    />

    <Button type="submit">Login</Button>
  </form>
</template>

<script setup lang="ts">
import type { User } from '@/types/api';

import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { useApi } from '@/composables/use-api';

import Input from '@/lib/input/input.vue';
import Button from '@/lib/button/button.vue';

type LoginForm = {
  email: string;
  password: string;
};

const emit = defineEmits<{
  (event: 'on-logged-in-user-update', user: User): void;
}>();

const { api } = useApi();
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
  const { onFetchResponse, onFetchError } = api('/auth/sign-in').post(values);

  // if an invalid user then show errors
  onFetchError((error: Error) => {
    actions.setFieldError('email', error.message);
    actions.setFieldError('password', error.message);
  });

  // if success then save a user
  onFetchResponse(async (response) => {
    const { data } = await response.json();

    emit('on-logged-in-user-update', data.user);
  });
});
</script>

<style lang="scss" scoped>
.login-container {
  max-width: 50%;
  margin: 100px auto 0;
}
</style>
