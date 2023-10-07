import { QueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios";


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: ({ queryKey }) =>
                axiosInstance
                    .get(queryKey.join('/'))
                    .then(({ data }) => data),
        },
    },
});
