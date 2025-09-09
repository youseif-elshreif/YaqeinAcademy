import React from "react";
import styles from "@/src/components/dashboard/admin/styles.module.css";
import skeletonStyles from "@/src/components/dashboard/admin/styles/SkeletonLoading.module.css";

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

          <div className={styles.cardHeader}>
            <div className={styles.studentInfo}>
              <div
                className={`${skeletonStyles.skeletonText} ${skeletonStyles.skeletonTextLong}`}
                style={{ height: "24px", width: "180px" }}
              />
            </div>
          </div>


          <div className={styles.cardBody}>
            <div className={styles.cardInfo}>

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
