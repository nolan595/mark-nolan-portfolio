export type StackCategory =
  | 'Frameworks & Languages'
  | 'Styling & Design'
  | 'Database & ORM'
  | 'Cloud & Deploy';

export interface StackItem {
  label: string;
  category: StackCategory;
  icon?: string;
  inMarquee?: boolean;
}
