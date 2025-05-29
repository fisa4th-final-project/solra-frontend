import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetOrgListResponseDto } from "@/lib/api/org/orgDto";


export async function getOrgListApi():Promise<GetOrgListResponseDto[] | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/organizations`,
    auth: true
  }).then(async (res: ApiResponse<GetOrgListResponseDto[]>) => {
    if (res.data) {
      return res.data;
    }
    return null;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '조직 리스트 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}