import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetRolePermListRequestParam, GetRolePermListResponseDto } from "@/lib/api/rolePerm/rolePermDto";

export async function getRolePermListApi(reqDto: GetRolePermListRequestParam):Promise<GetRolePermListResponseDto[] | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/role-permissions/${reqDto.roleId}`,
    auth: true
  }).then(async (res: ApiResponse<GetRolePermListResponseDto[]>) => {
    if (!res.data) return null;
      return res.data;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '역할 권한 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}