import type { Meta, StoryObj } from '@storybook/vue3';
import UsersList from './users-list.vue';
import { UserRole } from '@/types/api.ts';

const meta = {
  title: 'lib/users-list',
  component: UsersList,
  tags: ['autodocs'],
  args: {
    users: [
      {
        _id: 0,
        firstName: 'Den',
        lastName: 'Maf',
        email: 'test@gmail.com',
        role: UserRole.USER,
        position: 'developer',

        onHolidays: true,
        onVacation: false
      },
      {
        _id: 1,
        firstName: 'Alex',
        lastName: 'Flex',
        email: 'test@gmail.com',
        role: UserRole.USER,
        position: 'developer',

        onHolidays: false,
        onVacation: true
      },
      {
        _id: 2,
        firstName: 'Nona',
        lastName: 'Bi',
        email: 'test@gmail.com',
        role: UserRole.USER,
        position: 'manager',

        onHolidays: false,
        onVacation: false
      }
    ],
    loading: false,
    error: null
  }
} satisfies Meta<typeof UsersList>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutUsers: Story = {
  args: { users: [] }
};

export default meta;
