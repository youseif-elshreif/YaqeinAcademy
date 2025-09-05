import styles from "./PaginationControls.module.css";
import Button from "../../Button";

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
          <Button
            variant={currentPage === 1 ? "outline-secondary" : "secondary"}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            size="small"
          >
            السابق
          </Button>

          {/* Page numbers */}
          <div className={styles.pageNumbers}>
            {/* First page */}
            {getVisiblePages()[0] > 1 && (
              <>
                <Button
                  variant="outline-primary"
                  size="small"
                  onClick={() => onPageChange(1)}
                >
                  1
                </Button>
                {getVisiblePages()[0] > 2 && (
                  <span className={styles.ellipsis}>...</span>
                )}
              </>
            )}

            {/* Visible pages */}
            {getVisiblePages().map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "primary" : "outline-primary"}
                size="small"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            ))}

            {/* Last page */}
            {getVisiblePages()[getVisiblePages().length - 1] < totalPages && (
              <>
                {getVisiblePages()[getVisiblePages().length - 1] <
                  totalPages - 1 && (
                  <span className={styles.ellipsis}>...</span>
                )}
                <Button
                  variant="outline-primary"
                  size="small"
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          {/* Next button */}
          <Button
            variant={currentPage === totalPages ? "outline-secondary" : "secondary"}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            size="small"
          >
            التالي
          </Button>
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
