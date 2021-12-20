import React from "react";
import ReactPaginate from "react-paginate";

interface IPaginate {
  pageCount: number,
  handlePage: (page: number) => void
}
const Paginate: React.FC<IPaginate> = props => {
  if (props.pageCount <= 1) return null;

  const handlePage = ({ selected }) => {
    props.handlePage(selected + 1);
  };

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={props.pageCount}
      onPageChange={handlePage}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

export default React.memo(Paginate);
