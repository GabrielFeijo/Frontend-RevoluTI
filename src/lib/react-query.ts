import { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

let displayedNetworkFailureError = false;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry(failureCount) {
				if (failureCount >= 3) {
					if (displayedNetworkFailureError === false) {
						displayedNetworkFailureError = true;

						toast.error(
							'Estamos enfrentando uma demora inesperada no carregamento da aplicação. Por favor, tente novamente em alguns minutos.',
							{
								onDismiss: () => {
									displayedNetworkFailureError = false;
								},
							}
						);
					}

					return false;
				}

				return true;
			},
		},
		mutations: {
			onError(error) {
				if (isAxiosError(error)) {
					if ('message' in error.response?.data) {
						toast.error(error.response?.data.message);
					} else {
						toast.error('Ocorreu um erro ao processar a operação');
					}
				}
			},
		},
	},
});
