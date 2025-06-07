
export interface LoginRequestDto {
  userLoginId: string;
  password: string;
}

export interface LoginResponseDto {
  userId: number;
  orgId?: number;
  deptId?: number;
  roles: LoginResRole[];
}

export interface LoginResRole {
  roleId: number;
  roleName: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
}

export interface WhomiResponseDto {
  userId: number;
  userName: string;
  userLoginId: string;
  email: string;
  departmentId?: number;
  departmentName?: string;
  organizationId?: number;
  organizationName?: string;
  permNames: string[];
}

export interface CreateUserRequestDto {
  userLoginId: string;
  password: string;
  userName: string;
  email: string;
  orgId?: number;
  deptId?: number
}

export interface CreateUserResponseDto {
  userId: number;
  userName: string;
  userLoginId: string;
  email: string;
  departmentId?: number;
  organizationId?: number;
}

export interface UpdateUserRequestDto {
  userId: number;
  userLoginId: string;
  userName: string;
  password: string;
  email: string;
}

export interface UpdateUserResponseDto {
  userId: number;
  userName: string;
  userLoginId: string;
  email: string;
  departmentId?: number;
  organizationId?: number;
}

export interface GetUserListQueryParam {
  orgId?: number;
  deptId?: number;
  page: number;
  size: number;
}

export interface GetUserListResponseDto {
  content: GetUserListResContent[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface GetUserListResContent {
  userId: number;
  userName: string;
  userLoginId: string;
  email: string;
  departmentId?: number;
  organizationId?: number
  departmentName?: string;
  organizationName?: string;
}

export interface GetUserDetailQueryParam {
  userId: number;
}

export interface GetUserDetailResponseDto {
  userId: number;
  userName: string;
  userLoginId: string;
  email: string;
  departmentId?: number;
  organizationId?: number;
}

export interface DeleteUserQueryParam {
  userId: number;
}
