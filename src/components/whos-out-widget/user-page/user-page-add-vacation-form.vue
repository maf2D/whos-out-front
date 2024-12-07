<template>
  <form @submit="submitHandler" class="add-vacation">
    <h3>Add a new vacation</h3>

    <custom-input
      v-model="startDate"
      v-bind="startDateProps"
      name="start-date"
      type="input"
      placeholder="Please enter your start date"
      :class="{ error: errors.startDate }"
      :error="errors.startDate || ''"
    />

    <custom-input
      v-model="endDate"
      v-bind="endDateProps"
      name="start-date"
      type="input"
      placeholder="Please enter your end date"
      :class="{ error: errors.endDate }"
      :error="errors.endDate || ''"
    />

    <custom-button type="submit">Add</custom-button>
  </form>
</template>

<script lang="ts" setup>
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { useApi } from '@/composables/use-api';

import CustomInput from '@/lib/input/input.vue';
import CustomButton from '@/lib/button/button.vue';

type VacationForm = {
  startDate: string;
  endDate: string;
};

const emit = defineEmits<{
  (event: 'on-submit'): void;
}>();

const api = useApi();

const { errors, defineField, handleSubmit } = useForm<VacationForm>({
  initialValues: {
    startDate: '2024-12-20',
    endDate: '2024-12-25'
  },

  validationSchema: yup.object({
    startDate: yup.string().required(),
    endDate: yup.string().required()
  })
});

const [startDate, startDateProps] = defineField('startDate');
const [endDate, endDateProps] = defineField('endDate');

const submitHandler = handleSubmit(async (values, actions) => {
  const { onFetchResponse, onFetchError } = api('/vacations').post(values);

  onFetchError((error: Error) => {
    actions.setFieldError('startDate', error.message);
    actions.setFieldError('endDate', error.message);
  });

  onFetchResponse(() => {
    emit('on-submit');
  });
});
</script>

<style lang="scss" scoped>
.add-vacation {
  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 15px;
  }
}
</style>
