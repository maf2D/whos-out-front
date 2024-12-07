<template>
  <form @submit="submitHandler" class="login-container">
    <custom-input
      v-model="email"
      v-bind="emailProps"
      name="email"
      type="email"
      placeholder="Please enter your email"
      :class="{ error: errors.email }"
      :error="errors.email || ''"
    />

    <custom-input
      v-model="password"
      v-bind="passwordProps"
      name="password"
      type="password"
      placeholder="Please enter your password"
      :class="{ error: errors.password }"
      :error="errors.password || ''"
    />

    <custom-button type="submit">Login</custom-button>
  </form>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { Pages, useStore } from '@/store';
import { useApi } from '@/composables/use-api';

import CustomInput from '@/lib/input/input.vue';
import CustomButton from '@/lib/button/button.vue';

type LoginForm = {
  email: string;
  password: string;
};

const api = useApi();
const { activePageUpdate, userUpdate } = useStore();

const { errors, defineField, handleSubmit } = useForm<LoginForm>({
  initialValues: {
    email: 'test@gmail.com',
    password: 'test1234@M'
  },

  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })
});

const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');

const submitHandler = handleSubmit(async (values, actions) => {
  const { data, error } = await api('/auth/sign-in').post(values).json();
  const errorMsg = 'email or password is not correct';

  if (error.value) {
    actions.setFieldError('email', errorMsg);
    actions.setFieldError('password', errorMsg);
  }

  if (data.value) {
    userUpdate(data.value.data.user);
    activePageUpdate({ name: Pages.USERS });
  }
});
</script>

<style lang="scss" scoped>
.login-container {
  max-width: 50%;
  margin: 100px auto 0;
}
</style>
