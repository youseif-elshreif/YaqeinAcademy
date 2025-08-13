import styles from "./PaginationControls.module.css";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  const getVisiblePages = () => {
    const pages = [];
    const showPages = 5; // Number of page buttons to show

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);

    // Adjust start if we're near the end
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <div className="container">
        <div className={styles.paginationContent}>
          {/* Previous button */}
          <button
            className={`${styles.pageButton} ${styles.navButton} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            السابق
          </button>

          {/* Page numbers */}
          <div className={styles.pageNumbers}>
            {/* First page */}
            {getVisiblePages()[0] > 1 && (
              <>
                <button
                  className={styles.pageButton}
                  onClick={() => onPageChange(1)}
                >
                  1
                </button>
                {getVisiblePages()[0] > 2 && (
                  <span className={styles.ellipsis}>...</span>
                )}
              </>
            )}

            {/* Visible pages */}
            {getVisiblePages().map((page) => (
              <button
                key={page}
                className={`${styles.pageButton} ${
                  page === currentPage ? styles.active : ""
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}

            {/* Last page */}
            {getVisiblePages()[getVisiblePages().length - 1] < totalPages && (
              <>
                {getVisiblePages()[getVisiblePages().length - 1] <
                  totalPages - 1 && (
                  <span className={styles.ellipsis}>...</span>
                )}
                <button
                  className={styles.pageButton}
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Next button */}
          <button
            className={`${styles.pageButton} ${styles.navButton} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            التالي
          </button>
        </div>

        {/* Page info */}
        <div className={styles.pageInfo}>
          صفحة {currentPage} من {totalPages}
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
