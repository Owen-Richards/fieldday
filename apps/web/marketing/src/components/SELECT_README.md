# Select Component

A beautifully designed, accessible, and customizable dropdown select component built with React and TypeScript.

## Features

✨ **Clean Design** - Modern, polished UI with smooth transitions and hover states
🎨 **Multiple Variants** - Choose from `default`, `filled`, or `outlined` styles
📏 **Flexible Sizing** - Small, medium, and large size options
🎯 **Icon Support** - Add icons to enhance visual context
🌓 **Dark Mode** - Full dark mode support with seamless theme switching
♿ **Accessible** - Semantic HTML with proper ARIA attributes and keyboard navigation
⚡ **Performance** - Optimized with React best practices and minimal re-renders
🔧 **TypeScript** - Full type safety with comprehensive type definitions
📱 **Responsive** - Works beautifully on all screen sizes

## Installation

The component is already included in the project. Simply import it:

\`\`\`tsx
import { Select, FilterSelect } from '@/components/select';
\`\`\`

## Basic Usage

\`\`\`tsx
import { Select } from '@/components/select';

function MyComponent() {
const [value, setValue] = useState('option1');

return (
<Select
label="Choose an option"
options={[
{ value: 'option1', label: 'Option 1' },
{ value: 'option2', label: 'Option 2' },
{ value: 'option3', label: 'Option 3' },
]}
value={value}
onChange={(e) => setValue(e.target.value)}
/>
);
}
\`\`\`

## Props

### SelectProps

| Prop         | Type                                  | Default      | Description                                |
| ------------ | ------------------------------------- | ------------ | ------------------------------------------ |
| `options`    | `SelectOption[]`                      | **Required** | Array of options to display                |
| `label`      | `string`                              | `undefined`  | Label text displayed above the select      |
| `error`      | `string`                              | `undefined`  | Error message to display (changes styling) |
| `helperText` | `string`                              | `undefined`  | Helper text displayed below the select     |
| `icon`       | `ReactNode`                           | `undefined`  | Icon to display on the left side           |
| `variant`    | `'default' \| 'filled' \| 'outlined'` | `'default'`  | Visual style variant                       |
| `size`       | `'sm' \| 'md' \| 'lg'`                | `'md'`       | Size of the select component               |
| `disabled`   | `boolean`                             | `false`      | Whether the select is disabled             |
| `className`  | `string`                              | `''`         | Additional CSS classes                     |

Plus all standard HTML select attributes (`value`, `onChange`, `name`, etc.)

### SelectOption

\`\`\`typescript
type SelectOption = {
value: string;
label: string;
disabled?: boolean;
};
\`\`\`

## Variants

### Default

Clean white background with border - perfect for forms and data input

\`\`\`tsx
<Select variant="default" options={options} />
\`\`\`

### Filled

Subtle gray background with no border - great for filter bars and toolbars

\`\`\`tsx
<Select variant="filled" options={options} />
\`\`\`

### Outlined

Transparent background with prominent border - ideal for emphasis

\`\`\`tsx
<Select variant="outlined" options={options} />
\`\`\`

## Sizes

\`\`\`tsx
// Small - compact, for tight spaces
<Select size="sm" options={options} />

// Medium (default) - balanced for most use cases
<Select size="md" options={options} />

// Large - prominent, for emphasis
<Select size="lg" options={options} />
\`\`\`

## With Icons

Add visual context with Lucide React icons:

\`\`\`tsx
import { MapPin, Calendar, Dumbbell } from 'lucide-react';

<Select
icon={<MapPin className="w-5 h-5" strokeWidth={2} />}
options={locationOptions}
/>

<Select
icon={<Calendar className="w-5 h-5" strokeWidth={2} />}
options={dateOptions}
/>

<Select
icon={<Dumbbell className="w-5 h-5" strokeWidth={2} />}
options={sportOptions}
/>
\`\`\`

## States

### Normal

\`\`\`tsx
<Select
  options={options}
  helperText="This is a helper text"
/>
\`\`\`

### Error

\`\`\`tsx
<Select
  options={options}
  error="Please select a valid option"
/>
\`\`\`

### Disabled

\`\`\`tsx
<Select
  options={options}
  disabled
  helperText="This field is disabled"
/>
\`\`\`

## FilterSelect Convenience Component

Pre-configured select optimized for filter bars:

\`\`\`tsx
import { FilterSelect } from '@/components/select';
import { MapPin, Dumbbell, Calendar } from 'lucide-react';

<div className="flex gap-4">
  <FilterSelect
    icon={<Dumbbell className="w-5 h-5" strokeWidth={2} />}
    options={[
      { value: 'all', label: 'All Sports' },
      { value: 'soccer', label: 'Soccer' },
      { value: 'basketball', label: 'Basketball' },
    ]}
  />
  
  <FilterSelect
    icon={<MapPin className="w-5 h-5" strokeWidth={2} />}
    options={[
      { value: '5', label: 'Within 5 miles' },
      { value: '10', label: 'Within 10 miles' },
    ]}
  />
</div>
\`\`\`

## Real-World Example

Here's a complete filter bar implementation:

\`\`\`tsx
'use client';

import { useState } from 'react';
import { FilterSelect } from '@/components/select';
import { MapPin, Calendar, Dumbbell } from 'lucide-react';

export default function SessionFilters() {
const [sport, setSport] = useState('all');
const [distance, setDistance] = useState('5');
const [timeFilter, setTimeFilter] = useState('anytime');

return (
<div className="flex flex-wrap gap-4 items-end">
<div className="flex-1 min-w-[200px]">
<FilterSelect
value={sport}
onChange={(e) => setSport(e.target.value)}
icon={<Dumbbell className="w-5 h-5" strokeWidth={2} />}
options={[
{ value: 'all', label: 'All Sports' },
{ value: 'soccer', label: 'Soccer' },
{ value: 'basketball', label: 'Basketball' },
{ value: 'tennis', label: 'Tennis' },
]}
/>
</div>

      <div className="flex-1 min-w-[200px]">
        <FilterSelect
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          icon={<MapPin className="w-5 h-5" strokeWidth={2} />}
          options={[
            { value: '5', label: 'Within 5 miles' },
            { value: '10', label: 'Within 10 miles' },
            { value: '25', label: 'Within 25 miles' },
          ]}
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <FilterSelect
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          icon={<Calendar className="w-5 h-5" strokeWidth={2} />}
          options={[
            { value: 'anytime', label: 'Anytime' },
            { value: 'today', label: 'Today' },
            { value: 'tomorrow', label: 'Tomorrow' },
            { value: 'week', label: 'This Week' },
          ]}
        />
      </div>
    </div>

);
}
\`\`\`

## Styling

The component uses Tailwind CSS with the following design tokens:

### Colors

- **Primary**: `brand-primary-*` (blue shades)
- **Neutral**: `neutral-*` (gray shades)
- **Error**: `red-*`

### Transitions

- All interactive states use `transition-all duration-200 ease-in-out`
- Smooth hover effects with scale and color changes

### Spacing

- Small: `h-9 px-3` (36px height)
- Medium: `h-11 px-4` (44px height)
- Large: `h-13 px-5` (52px height)

### Border Radius

- All variants use `rounded-xl` (0.75rem)

## Accessibility

The Select component follows WAI-ARIA best practices:

- ✅ Semantic HTML `<select>` element
- ✅ Proper label association
- ✅ Keyboard navigation (Tab, Arrow keys, Enter, Escape)
- ✅ Focus indicators
- ✅ Screen reader support
- ✅ Disabled state handling
- ✅ Error state announcements

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

1. **Memoization**: Use `React.memo` if passing complex icon components
2. **Option Count**: For 100+ options, consider implementing virtual scrolling
3. **Re-renders**: Component only re-renders when props change

## Common Patterns

### Form Integration

\`\`\`tsx
import { useForm } from 'react-hook-form';

function MyForm() {
const { register, handleSubmit } = useForm();

return (
<form onSubmit={handleSubmit(onSubmit)}>
<Select
{...register('sport', { required: true })}
label="Favorite Sport"
options={sportOptions}
/>
</form>
);
}
\`\`\`

### Controlled vs Uncontrolled

\`\`\`tsx
// Controlled (recommended)
const [value, setValue] = useState('');
<Select value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled
<Select defaultValue="option1" />
\`\`\`

### Responsive Layout

\`\`\`tsx

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Select options={options1} />
  <Select options={options2} />
  <Select options={options3} />
</div>
\`\`\`

## Troubleshooting

### Icons not showing

Make sure you've installed `lucide-react` and added `strokeWidth={2}` to fix TypeScript issues:

\`\`\`bash
npm install lucide-react
\`\`\`

\`\`\`tsx
<Icon className="w-5 h-5" strokeWidth={2} />
\`\`\`

### Styling conflicts

The component uses `!important` sparingly. If you need to override styles, use higher specificity or Tailwind's `!` prefix:

\`\`\`tsx
<Select className="!bg-blue-500" />
\`\`\`

### Dark mode not working

Ensure your app has the ThemeProvider configured:

\`\`\`tsx
import { ThemeProvider } from 'next-themes';

<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>
\`\`\`

## Future Enhancements

Potential improvements for future versions:

- [ ] Multi-select support
- [ ] Search/filter functionality
- [ ] Custom option rendering
- [ ] Grouped options
- [ ] Virtual scrolling for large lists
- [ ] Animation on open/close
- [ ] Custom dropdown positioning

## Contributing

When adding new features:

1. Maintain TypeScript strict mode compliance
2. Add comprehensive JSDoc comments
3. Update this README
4. Test in both light and dark modes
5. Verify accessibility with screen readers

## License

MIT - Part of the FieldDay project
