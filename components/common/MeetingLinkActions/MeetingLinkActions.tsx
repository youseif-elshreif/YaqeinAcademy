import React from "react";
import { FaExternalLinkAlt, FaCopy } from "react-icons/fa";
import Button from "@/components/common/Button";

interface MeetingLinkActionsProps {
  meetingLink?: string;
  styles: any;
  containerClassName?: string;
  openButtonClassName?: string;
  copyButtonClassName?: string;
  showLabels?: boolean;
  disabled?: boolean;
  onCopySuccess?: () => void;
  onCopyError?: (error: Error) => void;
  onOpenLink?: (link: string) => void;
}

const MeetingLinkActions = ({
  meetingLink,
  styles,
  containerClassName = "",
  openButtonClassName = "",
  copyButtonClassName = "",
  showLabels = true,
  disabled = false,
  onCopySuccess,
  onCopyError,
  onOpenLink,
}: MeetingLinkActionsProps) => {
  // Function to copy class link to clipboard
  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      console.log("تم نسخ الرابط بنجاح");
      if (onCopySuccess) {
        onCopySuccess();
      }
    } catch (err) {
      console.error("فشل في نسخ الرابط:", err);
      if (onCopyError) {
        onCopyError(err as Error);
      }
    }
  };

  // Function to open link in new tab
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
    if (onOpenLink) {
      onOpenLink(link);
    }
  };

  if (!meetingLink && !disabled) {
    return (
      <div className={`${styles.linkContainer} ${containerClassName}`}>
        <span className={styles.lightColor}>—</span>
      </div>
    );
  }

  return (
    <div className={`${styles.linkContainer} ${containerClassName}`}>
      <Button
        onClick={() => handleOpenLink(meetingLink!)}
        variant="primary"
        size="small"
        icon={<FaExternalLinkAlt />}
        title="فتح رابط الحلقة"
        disabled={disabled || !meetingLink}
      >
        {showLabels ? "دخول الحلقة" : ""}
      </Button>
      <Button
        onClick={() => handleCopyLink(meetingLink!)}
        variant="secondary"
        size="small"
        title="نسخ رابط الحلقة"
        disabled={disabled || !meetingLink}
      >
        <FaCopy />
      </Button>
    </div>
  );
};

export default MeetingLinkActions;
