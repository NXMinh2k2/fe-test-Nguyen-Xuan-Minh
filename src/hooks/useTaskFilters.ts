import debounce from 'lodash/debounce';

import {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    useDispatch,
    useSelector,
} from 'react-redux';

import {
    selectFilters,
} from '../features/tasks/taskSelectors';

import {
    setFilter,
} from '../features/tasks/taskSlice';

export function useTaskFilters() {
    const dispatch =
        useDispatch();

    const filters =
        useSelector(
            selectFilters
        );

    const [
        searchValue,
        setSearchValue,
    ] = useState(
        filters.searchText
    );

    const debouncedSearch =
        useMemo(
            () =>
                debounce((value: string) => {
                    dispatch(setFilter({ searchText: value })
                    );
                },
                    300
                ),
            [dispatch]
        );

    const handleSearchChange = (
        value: string
    ) => {
        setSearchValue(value);
        debouncedSearch(value);
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return {
        dispatch,

        filters,

        searchValue,

        handleSearchChange,
    };
}