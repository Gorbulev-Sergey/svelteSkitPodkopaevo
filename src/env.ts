import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({ Access_Token: { public: true } });
