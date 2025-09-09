// ==================================================
// Modal System Types
// ==================================================

import { UserType } from "./auth.types";
import { BaseComponentProps, BaseModalProps } from "./base.types";

export interface WarningPanelProps extends BaseComponentProps {
  title: string;
  text?: string | React.ReactNode;
}

export interface UserTypeOption {
  type: UserType;
  icon: React.ReactNode;
  label: string;
}

export interface UserTypeSelectorProps extends BaseComponentProps {
  onSelect: (type: UserType) => void;
  disabled?: boolean;
  title?: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface SelectFieldProps extends BaseComponentProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

export interface SelectedUserTypeHeaderProps extends BaseComponentProps {
  userType: UserType;
  userName?: string;
  mode?: "add" | "edit";
  onChangeType?: () => void;
  disabled?: boolean;
}

// Note: ModalHeaderProps is defined in component.types.ts to avoid duplication

export interface ModalContainerProps extends BaseModalProps {
  isClosing?: boolean;
  variant?: "add" | "edit" | "delete" | "default";
  size?: "small" | "medium" | "large";
}

export interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  type?: "button" | "submit";
}

export interface ModalActionsProps extends BaseComponentProps {
  actions: ActionButton[];
  alignment?: "left" | "right" | "center" | "space-between";
}

export interface ConfirmTextInputProps extends BaseComponentProps {
  label: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export interface ActionButtonProps extends BaseComponentProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}
