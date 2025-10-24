declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';

  export type LucideProps = SVGProps<SVGSVGElement> & {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
    strokeWidth?: string | number;
  };

  export type LucideIcon = FC<LucideProps>;

  export const ChevronDown: LucideIcon;
  export const MapPin: LucideIcon;
  export const Calendar: LucideIcon;
  export const Dumbbell: LucideIcon;
  export const Users: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Clock: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const Sun: LucideIcon;
  export const Moon: LucideIcon;
  // Add other icons as needed
}
