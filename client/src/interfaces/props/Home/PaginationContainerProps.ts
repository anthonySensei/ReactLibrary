import MainPagination from "../../MainPagination";

export default interface PaginationContainerProps {
    paginationData: MainPagination;
    onHandlePagination: (page: number) => void;
}
