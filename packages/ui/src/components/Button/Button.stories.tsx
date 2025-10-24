import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Button, ButtonGroup } from './Button';

type ButtonPropsType = ComponentProps<typeof Button>;

const meta = {
  title: 'Components/Button',
  component: Button as any,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<ButtonPropsType>;

export default meta;
type Story = StoryObj<ButtonPropsType>;

// SVG Icons for demos
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export const Primary: Story = {
  args: {
    children: 'Join Session',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Create Session',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'View Details',
    variant: 'ghost',
  },
};

export const Soft: Story = {
  args: {
    children: 'Learn More',
    variant: 'soft',
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete Session',
    variant: 'danger',
  },
};

export const Success: Story = {
  args: {
    children: 'Confirm Payment',
    variant: 'success',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Button isLoading>Processing...</Button>
      <Button isLoading loadingText="Joining session...">
        Join Now
      </Button>
      <Button variant="secondary" isLoading>
        Loading
      </Button>
      <Button variant="soft" isLoading loadingText="Fetching data...">
        Fetch
      </Button>
    </div>
  ),
};

export const SuccessStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Button isSuccess>Successfully Joined!</Button>
      <Button isSuccess successDuration={3000}>
        Payment Complete
      </Button>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button isDisabled>Disabled Primary</Button>
      <Button variant="secondary" isDisabled>
        Disabled Secondary
      </Button>
      <Button variant="ghost" isDisabled>
        Disabled Ghost
      </Button>
      <Button variant="danger" isDisabled>
        Disabled Danger
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Button leftIcon={<PlusIcon />}>Create Session</Button>
      <Button rightIcon={<ArrowRightIcon />}>Continue</Button>
      <Button leftIcon={<HeartIcon />} variant="secondary">
        Add to Favorites
      </Button>
      <Button leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />} variant="soft">
        Get Started
      </Button>
    </div>
  ),
};

export const IconOnlyButtons: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Button iconOnly size="xs" ariaLabel="Like" tooltip="Like this session">
        <HeartIcon />
      </Button>
      <Button iconOnly size="sm" variant="secondary" ariaLabel="Add" tooltip="Add new">
        <PlusIcon />
      </Button>
      <Button iconOnly size="md" variant="ghost" ariaLabel="Next" tooltip="Go to next">
        <ArrowRightIcon />
      </Button>
      <Button iconOnly size="lg" variant="soft" ariaLabel="Favorite" tooltip="Mark as favorite">
        <HeartIcon />
      </Button>
      <Button iconOnly size="xl" variant="primary" ariaLabel="Create" tooltip="Create new session">
        <PlusIcon />
      </Button>
    </div>
  ),
};

export const FullWidthExample: Story = {
  render: () => (
    <div className="w-96 flex flex-col gap-4">
      <Button fullWidth>Join Session</Button>
      <Button fullWidth variant="secondary">
        Create Session
      </Button>
      <Button fullWidth variant="ghost">
        View All Sessions
      </Button>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const ButtonGroups: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-start">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-700">Horizontal Group</h3>
        <ButtonGroup>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-700">Vertical Group</h3>
        <ButtonGroup orientation="vertical">
          <Button variant="ghost">Profile</Button>
          <Button variant="ghost">Settings</Button>
          <Button variant="ghost">Logout</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-700">Mixed Variants</h3>
        <ButtonGroup>
          <Button variant="ghost">Previous</Button>
          <Button variant="soft">Save Draft</Button>
          <Button variant="primary">Publish</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const MobileExample: Story = {
  render: () => (
    <div className="w-[375px] p-4 bg-white border border-neutral-200 rounded-2xl shadow-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1">Friday Night Soccer</h2>
        <p className="text-sm text-neutral-600">Riverside Park • 7:00 PM</p>
      </div>

      <div className="bg-neutral-50 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Skill Level</span>
          <span className="text-sm text-neutral-600">Intermediate</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Spots Available</span>
          <span className="text-sm text-brand-primary-600 font-semibold">4 / 12</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button fullWidth size="lg" variant="primary">
          Join for $15
        </Button>
        <Button fullWidth size="md" variant="soft">
          Invite Friends
        </Button>
      </div>
    </div>
  ),
};
