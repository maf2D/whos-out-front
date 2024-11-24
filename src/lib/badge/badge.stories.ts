import type { Meta, StoryObj } from '@storybook/vue3';
import Badge from './badge.vue';

const meta = {
  title: 'lib/badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    label: '100',
    type: 'light'
  }
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

export const Light: Story = {};
export const Dark: Story = { args: { type: 'dark' } };

export default meta;
