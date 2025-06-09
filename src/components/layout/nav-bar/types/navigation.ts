// Navigation type definitions
export interface NavSubItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavItem {
  label: string;
  href?: string;
  isExternal?: boolean;
  children?: NavSubItem[];
}

export interface CtaButton {
  label: string;
  href: string;
}

export interface NavigationData {
  mainItems: NavItem[];
  ctaButton: CtaButton;
}
