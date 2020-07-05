import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';

import PaginationContainerProps from '../../../interfaces/props/PaginationContainerProps';
import MainPagination from '../../../interfaces/MainPagination';

const PaginationContainer = (props: PaginationContainerProps) => {
    const paginationData: MainPagination = props.paginationData;
    const handlePagination = props.onHandlePagination;

    return (
        <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
        >
            {paginationData.hasPreviousPage && (
                <Button
                    onClick={() =>
                        handlePagination(paginationData.previousPage)
                    }
                >
                    Previous page
                </Button>
            )}
            {paginationData.hasPreviousPage && (
                <Button onClick={() => handlePagination(1)}>1</Button>
            )}
            <Button>{paginationData.currentPage}</Button>
            {paginationData.hasNextPage && (
                <Button
                    onClick={() => handlePagination(paginationData.lastPage)}
                >
                    {paginationData.lastPage}
                </Button>
            )}
            {paginationData.hasNextPage && (
                <Button
                    onClick={() => handlePagination(paginationData.nextPage)}
                >
                    Next page
                </Button>
            )}
        </ButtonGroup>
    );
};

export default PaginationContainer;
