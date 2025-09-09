import React from "react";
import { FaExternalLinkAlt, FaCopy } from "react-icons/fa";
import Button from "@/src/components/common/Button";
import { MeetingLinkActionsProps } from "@/src/types";

const MeetingLinkActions = ({
  meetingLink,
  styles,
  containerClassName = "",
  showLabels = true,
  disabled = false,
  onCopySuccess,
  onCopyError,
  onOpenLink,
}: MeetingLinkActionsProps) => {
  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      if (onCopySuccess) {
        onCopySuccess();
      }
    } catch (err) {
      if (onCopyError) {
        onCopyError(err as Error);
      }
    }
  };

  const handleOpenLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
    if (onOpenLink) {
      onOpenLink(link);
    }
  };

  if (!meetingLink && !disabled) {
    return (
      <div className={`${styles.linkContainer} ${containerClassName}`}>
        <span className={styles.lightColor}>ـ</span>
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
        title="فتح رابط الاجتماع"
        disabled={disabled || !meetingLink}
      >
        {showLabels ? "فتح الرابط" : ""}
      </Button>
      <Button
        onClick={() => handleCopyLink(meetingLink!)}
        variant="secondary"
        size="small"
        title="نسخ رابط الاجتماع"
        disabled={disabled || !meetingLink}
      >
        <FaCopy />
      </Button>
    </div>
  );
};

export default MeetingLinkActions;
