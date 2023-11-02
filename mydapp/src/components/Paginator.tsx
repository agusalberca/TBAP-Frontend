import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface TablePagesProps {
    data: any[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    handlePrevPage: () => void;
    handleNextPage: () => void;
  }

const TablePages = ({
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    handlePrevPage,
    handleNextPage,
  }: TablePagesProps) => {
  
  return (
    <div className="Table__Pages">
      <button
        className="Table__Pages-Arrow"
        onClick={handlePrevPage}
        disabled={page < 2}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className="Table__Pages-Text">
        <span>{`${(page - 1) * perPage + 1}-${
          (page - 1) * perPage + data?.length
        }`}</span>
        <span>{' de '}</span>
        <span>{totalItems}</span>
      </div>
      <button
        className="Table__Pages-Arrow"
        onClick={handleNextPage}
        disabled={page >= totalPages}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  )
}
  export default TablePages

