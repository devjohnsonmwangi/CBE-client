import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../api/auth';
import type { LoginDto } from '../types';

function setToken(token: string | null) {
	if (token) localStorage.setItem('token', token);
	else localStorage.removeItem('token');
}

export function useLogin(onSuccess?: (data: unknown) => void) {
	return useMutation({
		mutationFn: async (payload: LoginDto) => {
			const res = await loginApi(payload);
			if (res?.access_token) setToken(res.access_token);
			if (onSuccess) onSuccess(res);
			return res;
		},
	});
}
