import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetRolesResponseDto } from "@/lib/api/role/roleDto";


export async function getRolesApi():Promise<GetRolesResponseDto[] | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/roles`,
    auth: true
  }).then(async (res: ApiResponse<GetRolesResponseDto[]>) => {
    if (res.data) {
      return res.data;
    }
    return null;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '역할 리스트 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}