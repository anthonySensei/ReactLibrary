import MainPagination from "../../../interfaces/MainPagination";

export default interface PaginationContainerProps {
    paginationData: MainPagination;
    onHandlePagination: (page: number) => void;
}
