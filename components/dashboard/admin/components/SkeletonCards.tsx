import React from "react";
import styles from "@/components/dashboard/admin/styles.module.css";
import skeletonStyles from "@/components/dashboard/admin/styles/SkeletonLoading.module.css";

interface SkeletonCardsProps {
  cards?: number;
  type?: "student" | "teacher";
}

const SkeletonCards: React.FC<SkeletonCardsProps> = ({
  cards = 3,
  type = "student",
}) => {
  return (
    <div className={styles.mobileCardsContainer}>
      {Array.from({ length: cards }).map((_, index) => (
        <div
          key={index}
          className={`${styles.classCard} ${skeletonStyles.skeletonCard}`}
        >
          {/* Header - مطابق للأصلي */}
          <div className={styles.cardHeader}>
            <div className={styles.studentInfo}>
              <div
                className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextLong}`}
                style={{ height: "24px", width: "180px" }}
              />
            </div>
          </div>

          {/* Body - مطابق للأصلي */}
          <div className={styles.cardBody}>
            <div className={styles.cardInfo}>
              {/* البريد الإلكتروني / الإيميل */}
              <div className={styles.infoItem}>
                <div
                  className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextShort}`}
                  style={{ height: "14px", width: "80px" }}
                />
                <div
                  className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextMedium}`}
                  style={{ height: "14px", width: "150px" }}
                />
              </div>

              {/* رقم الهاتف */}
              <div className={styles.infoItem}>
                <div
                  className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextShort}`}
                  style={{ height: "14px", width: "60px" }}
                />
                <div
                  className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextMedium}`}
                  style={{ height: "14px", width: "120px" }}
                />
              </div>

              {type === "student" ? (
                <>
                  {/* الرقم التعريفي */}
                  <div className={styles.infoItem}>
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextShort}`}
                      style={{ height: "14px", width: "90px" }}
                    />
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextShort}`}
                      style={{ height: "14px", width: "80px" }}
                    />
                  </div>

                  {/* عدد الحلقات المستحقة */}
                  <div className={styles.infoItem}>
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "120px" }}
                    />
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextShort}`}
                      style={{ height: "14px", width: "40px" }}
                    />
                  </div>

                  {/* العمر */}
                  <div className={styles.infoItem}>
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextShort}`}
                      style={{ height: "14px", width: "40px" }}
                    />
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextShort}`}
                      style={{ height: "14px", width: "50px" }}
                    />
                  </div>

                  {/* الدولة */}
                  <div className={styles.infoItem}>
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextShort}`}
                      style={{ height: "14px", width: "50px" }}
                    />
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "100px" }}
                    />
                  </div>

                  {/* حفظ القرآن */}
                  <div className={styles.infoItem}>
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "70px" }}
                    />
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextShort}`}
                      style={{ height: "14px", width: "60px" }}
                    />
                  </div>

                  {/* عدد الأجزاء */}
                  <div className={styles.infoItem}>
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "80px" }}
                    />
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextShort}`}
                      style={{ height: "14px", width: "30px" }}
                    />
                  </div>

                  {/* تاريخ التسجيل */}
                  <div className={styles.infoItem}>
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "90px" }}
                    />
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "110px" }}
                    />
                  </div>

                  {/* الإجراءات */}
                  <div className={styles.infoItem}>
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextShort}`}
                      style={{ height: "14px", width: "60px" }}
                    />
                    <div className={styles.cardLinkContainer}>
                      <div
                        className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonButton}`}
                        style={{
                          height: "32px",
                          width: "100px",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* رصيد الحلقات */}
                  <div className={styles.infoItem}>
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "80px" }}
                    />
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextShort}`}
                      style={{ height: "14px", width: "40px" }}
                    />
                  </div>

                  {/* تاريخ التسجيل */}
                  <div className={styles.infoItem}>
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "90px" }}
                    />
                    <div
                      className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "110px" }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {type === "teacher" && (
            <>
              {/* رابط الحلقة */}
              <div className={styles.infoItem}>
                <div
                  className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextMedium}`}
                  style={{ height: "14px", width: "80px" }}
                />
                <div className={styles.cardLinkContainer}>
                  <div
                    className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonButton}`}
                    style={{
                      height: "32px",
                      width: "100px",
                      borderRadius: "6px",
                    }}
                  />
                  <div
                    className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonButton}`}
                    style={{
                      height: "32px",
                      width: "40px",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              </div>

              {/* الإجراءات */}
              <div className={styles.infoItem}>
                <div
                  className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextShort}`}
                  style={{ height: "14px", width: "60px" }}
                />
                <div className={styles.cardLinkContainer}>
                  <div
                    className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonButton}`}
                    style={{
                      height: "32px",
                      width: "80px",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Actions - فقط للطلاب */}
          {type === "student" && (
            <div className={styles.cardActions}>
              <div className={styles.linkContainer}>
                <div
                  className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonButton}`}
                  style={{
                    height: "36px",
                    width: "100px",
                    borderRadius: "6px",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkeletonCards;
