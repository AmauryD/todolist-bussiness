import type { SetupWorkerApi } from 'msw';
import { rest } from 'msw';

export function setupWorker(worker: SetupWorkerApi) {
  worker.use(
    rest.post('http://localhost:8080/api/v1/auth/login', (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTE2MjAzOTAyMn0.wuD_2Nd34saGzi764Zj8FGZVQOYgePwpcWjEoZ41qI4',
          refreshToken: '123',
        })
      );
    }),
    rest.get('http://localhost:8080/api/v1/users/profile', (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            type: 'users',
            id: '1',
            attributes: {
              email: '',
              firstName: '',
              lastName: '',
              phone: '',
              role: '',
            },
          },
        })
      );
    })
  );
}
