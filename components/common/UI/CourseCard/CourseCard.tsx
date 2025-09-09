"use client";

import styles from "./CourseCard.module.css";
import { FaTag } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Button from "../../Button";
import { CourseCardProps } from "@/types";

const CourseCard = ({
  title,
  startDate,
  duration,
  shortDescription,
  showBtn,
  isAdminView = false,
  onEdit,
  onDelete,
  telegramLink,
}: CourseCardProps) => {
  const handleEdit = () => {
    if (isAdminView && onEdit) {
      onEdit();
    }
  };

  const handleDelete = () => {
    if (isAdminView && onDelete) {
      onDelete();
    }
  };

  const handleBookNow = () => {
    if (telegramLink) {
      window.open(telegramLink, "_blank");
    } else {}
  };

  return (
    <div className={`${styles.card}`}>
      {/* edite and delete btns */}
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.description}>{shortDescription}</p>

        <div className={styles.courseInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>تاريخ البداية:</span>
            <span className={styles.value}>{startDate}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>مدة الدورة:</span>
            <span className={styles.value}>{duration || "غير محدد"}</span>
          </div>
        </div>
      </div>

      {showBtn && (
        <div className={styles.cardFooter}>
          <Button variant="primary" fullWidth={true} onClick={handleBookNow}>
            احجز الآن
          </Button>
        </div>
      )}
      {!showBtn && isAdminView && (
        <div className={styles.cardActions}>
          <Button
            variant="primary"
            size="small"
            icon={<FaTag />}
            fullWidth={true}
            onClick={handleEdit}
          >
            تعديل
          </Button>
          <Button
            variant="danger"
            size="small"
            fullWidth={true}
            icon={<MdDeleteOutline />}
            onClick={handleDelete}
          >
            حذف
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
