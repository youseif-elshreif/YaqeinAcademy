import { BaseComponentProps, BaseModalProps } from "./base.types";
export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}
export type NavbarProps = BaseComponentProps;
export type FooterProps = BaseComponentProps;
export interface LayoutProps extends BaseComponentProps {
  children: React.ReactNode;
}
export interface ModalContainerProps extends BaseModalProps {
  children: React.ReactNode;
}
export interface HeroSectionProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}
export interface BreadcrumbItem {
  label: string;
  href?: string;
}
export interface BreadcrumbProps extends BaseComponentProps {
  items: BreadcrumbItem[];
}
export interface HeaderProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}
