import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateUserRoleReqDto, CreateUserRoleResDto } from "@/lib/api/userRole/UserRoleDto";
import { useResStore } from "@/store/response";

export async function createUserRoleApi(reqDto: CreateUserRoleReqDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "POST",
    path: "api/user-roles",
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<CreateUserRoleResDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}