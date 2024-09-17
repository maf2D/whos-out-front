export type ApiUserResponse = ApiResponse<{ user: User; token: string; }>;
export type ApiUsersResponse = ApiResponse<{
  users: User[];
  usersOnVacation: number;
  usersOnHolidays: number;
  totalUsers: number;
}>;

type ApiResponse<T> = {
  data: T;
};

export type User = {
  _id: number,
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  position: string;
  avatar?: string;

  onHolidays: boolean;
  onVacation: boolean;
  awayTill?: Date;
};

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}
