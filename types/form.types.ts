// ==================================================
// Form Component Types
// ==================================================

import { BaseComponentProps } from "./base.types";

export interface InputFieldProps extends BaseComponentProps {
  id: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
  min?: string | number;
  max?: string | number;
  helpText?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export interface TextareaFieldProps extends BaseComponentProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  rows?: number;
  helpText?: string;
}

export interface CheckboxFieldProps extends BaseComponentProps {
  id: string;
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface CountrySelectProps {
  onChange: (countryName: string, countryCode: string) => void;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface Option {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export interface ErrorMessageProps {
  message: string;
  type?: "error" | "success" | "info";
  className?: string;
}

export interface ErrorDisplayProps {
  message: string;
  variant?: "error" | "warning" | "info";
}

export interface ConfirmTextInputProps {
  expectedText: string;
  onConfirm: (confirmed: boolean) => void;
  placeholder?: string;
  label?: string;
}
