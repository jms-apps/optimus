import { create } from 'zustand';

export interface AlertStore {
  shouldShowAlert: boolean;
  showAlert: (params: Pick<AlertStore, 'message' | 'severity'>) => void;
  hideAlert: () => void;
  message: string;
  severity: 'error' | 'warning' | 'success';
}

export const useAlertStore = create<AlertStore>((set) => ({
  shouldShowAlert: false,
  message: '',
  severity: 'error',
  showAlert: ({ severity, message }) =>
    set(() => ({ shouldShowAlert: true, message, severity })),
  hideAlert: () =>
    set(() => ({ shouldShowAlert: false, message: '', severity: 'error' })),
}));
