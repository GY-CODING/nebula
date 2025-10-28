import { SWRConfiguration } from "../../node_modules/swr/dist/_internal/types";
import useSWR from "../../node_modules/swr/dist/index/index";

type FetcherFn<T> = (key: string | null) => Promise<T>;

interface UseCustomFetchOptions<T> {
    fetcher?: FetcherFn<T>; 
    fetchOptions?: RequestInit; 
    swrOptions?: SWRConfiguration; 
    enabled?: boolean;
}

export function useCustomFetch<T = any>(
    key: string | null,
    opts: UseCustomFetchOptions<T> = {}
) {
    const { fetcher, fetchOptions, swrOptions, enabled = true } = opts;

    const defaultFetcher: FetcherFn<T> = async (url) => {
        if (!url) throw new Error('No URL provided to default fetcher');
        const res = await fetch(url, fetchOptions);
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(text || `Network response was not ok (${res.status})`);
        }
        return (await res.json()) as T;
    };

    const { data, error, isValidating, mutate } = useSWR<T>(
        enabled && key ? key : null,
        fetcher ? () => fetcher(key) : () => defaultFetcher(key),
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            ...(swrOptions || {}),
        }
    );

    return {
        data: (data ?? null) as T | null,
        isLoading: !error && (data === undefined) && isValidating,
        error: (error as Error) || null,
        mutate,
    };
}

export function createServiceHook(baseUrl: string) {
    const base = baseUrl.replace(/\/$/, '');
    return function useServiceFetch<T = any>(path: string | null, opts?: UseCustomFetchOptions<T>) {
        const key = path ? `${base}/${path.replace(/^\//, '')}` : null;
        return useCustomFetch<T>(key, opts);
    };
}
