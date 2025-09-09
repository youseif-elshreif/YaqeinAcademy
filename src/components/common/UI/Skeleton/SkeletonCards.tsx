import React from "react";
import styles from "./SkeletonLoading.module.css";
import { SkeletonCardsProps } from "@/src/types";

const SkeletonCards: React.FC<SkeletonCardsProps> = ({
  cards = 3,
  type = "student",
  className = "",
}) => {
  return (
    <div className={`skeleton-cards-container ${className}`}>
      {Array.from({ length: cards }).map((_, index) => (
        <div key={index} className={`skeleton-card ${styles.skeletonCard}`}>
          {/* Header */}
          <div className="card-header">
            <div className="skeleton-info">
              <div
                className={`${styles.skeletonText} ${styles.skeletonTextLong}`}
                style={{ height: "24px", width: "180px" }}
              />
            </div>
          </div>

          {/* Body */}
          <div className="card-body">
            <div className="card-info">
              {type === "lesson" ? (
                <>
                  {/* نوع مخصص للحلقات - للمعلمين */}
                  <div className="info-item">
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextShort}`}
                      style={{ height: "14px", width: "80px" }}
                    />
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "150px" }}
                    />
                  </div>

                  <div className="info-item">
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextShort}`}
                      style={{ height: "14px", width: "60px" }}
                    />
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "120px" }}
                    />
                  </div>

                  <div className="info-item">
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextShort}`}
                      style={{ height: "14px", width: "50px" }}
                    />
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextShort}`}
                      style={{ height: "14px", width: "80px" }}
                    />
                  </div>

                  <div className="info-item">
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "90px" }}
                    />
                    <div className="card-link-container">
                      <div
                        className={`${styles.skeletonText} ${styles.skeletonButton}`}
                        style={{
                          height: "32px",
                          width: "100px",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                  </div>

                  <div className="info-item">
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextShort}`}
                      style={{ height: "14px", width: "60px" }}
                    />
                    <div className="card-link-container">
                      <div
                        className={`${styles.skeletonText} ${styles.skeletonButton}`}
                        style={{
                          height: "32px",
                          width: "80px",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* النوع العادي للطلاب والمعلمين */}
                  <div className="info-item">
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextShort}`}
                      style={{ height: "14px", width: "80px" }}
                    />
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "150px" }}
                    />
                  </div>

                  <div className="info-item">
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextShort}`}
                      style={{ height: "14px", width: "60px" }}
                    />
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "120px" }}
                    />
                  </div>

                  {type === "student" && (
                    <>
                      <div className="info-item">
                        <div
                          className={`${styles.skeletonText} ${styles.skeletonTextShort}`}
                          style={{ height: "14px", width: "90px" }}
                        />
                        <div
                          className={`${styles.skeletonText} ${styles.skeletonTextShort}`}
                          style={{ height: "14px", width: "80px" }}
                        />
                      </div>

                      <div className="info-item">
                        <div
                          className={`${styles.skeletonText} ${styles.skeletonTextMedium}`}
                          style={{ height: "14px", width: "120px" }}
                        />
                        <div
                          className={`${styles.skeletonText} ${styles.skeletonTextShort}`}
                          style={{ height: "14px", width: "40px" }}
                        />
                      </div>
                    </>
                  )}

                  {type === "teacher" && (
                    <>
                      <div className="info-item">
                        <div
                          className={`${styles.skeletonText} ${styles.skeletonTextMedium}`}
                          style={{ height: "14px", width: "80px" }}
                        />
                        <div
                          className={`${styles.skeletonText} ${styles.skeletonTextShort}`}
                          style={{ height: "14px", width: "40px" }}
                        />
                      </div>

                      <div className="info-item">
                        <div
                          className={`${styles.skeletonText} ${styles.skeletonTextMedium}`}
                          style={{ height: "14px", width: "80px" }}
                        />
                        <div className="card-link-container">
                          <div
                            className={`${styles.skeletonText} ${styles.skeletonButton}`}
                            style={{
                              height: "32px",
                              width: "100px",
                              borderRadius: "6px",
                            }}
                          />
                          <div
                            className={`${styles.skeletonText} ${styles.skeletonButton}`}
                            style={{
                              height: "32px",
                              width: "40px",
                              borderRadius: "6px",
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="info-item">
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "90px" }}
                    />
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextMedium}`}
                      style={{ height: "14px", width: "110px" }}
                    />
                  </div>

                  <div className="info-item">
                    <div
                      className={`${styles.skeletonText} ${styles.skeletonTextShort}`}
                      style={{ height: "14px", width: "60px" }}
                    />
                    <div className="card-link-container">
                      <div
                        className={`${styles.skeletonText} ${styles.skeletonButton}`}
                        style={{
                          height: "32px",
                          width: "100px",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCards;
