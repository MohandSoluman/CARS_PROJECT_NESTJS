import { UsersService } from './users.service';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';

it('can create an instance from Auth service', async () => {
  const fackUserService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: fackUserService,
      },
    ],
  }).compile();
  const service = module.get(AuthService);
  expect(service).toBeDefined();
});
