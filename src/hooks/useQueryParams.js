import { useLocation } from 'react-router-dom';

export default function useQueryParams(query) {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const param = searchParams.get(query);
    return param;
}
