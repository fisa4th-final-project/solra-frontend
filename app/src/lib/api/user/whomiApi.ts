import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useAuthStore } from "@/store/auth";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { WhomiResponseDto } from "@/lib/api/user/userDto";
import { apiHandler } from "@/lib/global/apiManager";
import type { GetUserRoleByUserIdResponseDto } from "@/lib/api/userRole/UserRoleDto";
import { useResStore } from "@/store/response";

export async function whomiApi() {
  const resStore = useResStore();
  const auth = useAuthStore();
  await apiRequest({
    method: "GET",
    path: "api/auth/me",
    auth: true
  }).then(async (res: ApiResponse<WhomiResponseDto>) => {
    if (res.data) {
      const userRoles = await apiHandler.getUserRoleByUserIdApi({
        userId: res.data.userId
      }) ?? [] as GetUserRoleByUserIdResponseDto[];
      auth.whomi({
        userRoles,
        userId: res.data.userId,
        userName: res.data.userName,
        userLoginId: res.data.userLoginId,
        email: res.data.email,
        organizationId: res.data.organizationId,
        organizationName: res.data.organizationName,
        departmentId: res.data.departmentId,
        departmentName: res.data.departmentName,
        permNames: res.data.permNames
      });
    }
    resStore.push(res);
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  });
}