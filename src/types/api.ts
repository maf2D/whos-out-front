export type ApiUserResponse = ApiResponse<{ user: User; token: string }>;
export type ApiUsersResponse = ApiResponse<{
  users: User[];
  usersCount: number;
  usersOnVacationCount: number;
}>;

type ApiResponse<T> = {
  data: T;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  onVacation: boolean;
  remainingVacationDays: number;
};

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}
