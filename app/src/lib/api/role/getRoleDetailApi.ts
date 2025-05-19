import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetRoleDetailRequestParam, GetRoleDetailResponseDto } from "@/lib/api/role/roleDto";


export async function getRoleDetailApi(reqDto: GetRoleDetailRequestParam):Promise<GetRoleDetailResponseDto | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/roles/${reqDto.roleId}`,
    auth: true
  }).then(async (res: ApiResponse<GetRoleDetailResponseDto>) => {
    if (res.data) {
      return res.data;
    }
    return null;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '역할 상세 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}