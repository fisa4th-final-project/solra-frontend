import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetUserRoleByUserIdQueryParam, GetUserRoleByUserIdResponseDto } from "@/lib/api/userRole/UserRoleDto";

export async function getUserRoleByUserIdApi(reqParam: GetUserRoleByUserIdQueryParam):Promise<GetUserRoleByUserIdResponseDto[] | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/user-roles/${reqParam.userId}`,
    auth: true
  }).then(async (res: ApiResponse<GetUserRoleByUserIdResponseDto[]>) => {
    if (res.data) {
      console.log(res.data);
      return res.data;
    }
    return null;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '사용자 직책 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}