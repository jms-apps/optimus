interface CheckLogin {
  token: string | null;
}

export function useCheckLogin(): CheckLogin {
  return { token: localStorage.getItem('token') };
}
