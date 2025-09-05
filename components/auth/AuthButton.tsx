import Button from "../common/Button";

interface AuthButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  className?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  loadingText,
  children,
  variant = "primary",
  fullWidth = true,
  className = "",
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      variant={variant}
      fullWidth={fullWidth}
      className={className}
    >
      {loading && loadingText ? loadingText : children}
    </Button>
  );
};

export default AuthButton;
