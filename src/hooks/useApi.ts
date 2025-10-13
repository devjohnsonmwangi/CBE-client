import { useMutation, useQuery } from '@tanstack/react-query';

type Fn<T> = (...args: any[]) => Promise<T>;

export function useQueryWrapper<T>(key: string | readonly any[], fn: Fn<T>, enabled = true) {
  return useQuery<T>({ queryKey: Array.isArray(key) ? key : [key], queryFn: fn as any, enabled });
}

export function useMutationWrapper<T, V = any>(fn: Fn<T>, options?: any) {
  return useMutation<T, any, V>({ mutationFn: fn as any, ...options, onSuccess: (...args: any[]) => { if (options?.onSuccess) options.onSuccess(...args); } });
}
