import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import { useAuthStore } from "@/store/auth";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { WhomiResponseDto } from "@/lib/api/user/userDto";
import { apiHandler } from "@/lib/global/apiManager";
import type { GetUserRoleByUserIdResponseDto } from "@/lib/api/userRole/UserRoleDto";

export async function whomiApi() {

  const dialog = useDialogStore();
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
        email: res.data.email
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '내 정보조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}