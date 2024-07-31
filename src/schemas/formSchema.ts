import isPostalCode from 'validator/lib/isPostalCode';
import { z } from 'zod';

export const formSchema = z.object({
    postalCode: z.string().refine((val) => isPostalCode(val, 'BR'), {
        message: 'CEP inválido',
    }),
});
