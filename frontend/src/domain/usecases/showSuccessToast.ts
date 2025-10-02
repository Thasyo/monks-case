import { toast } from 'sonner';
import type { LoginCredentials } from '../../core/entities/User';

/**
 * * @param user
 */
export const showSuccessToast = (user: LoginCredentials) => {
  toast.success(`Bem-vindo(a), ${user.username.split('@')[0]}!`, {
    duration: 3000,
  });
};