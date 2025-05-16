import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetDeptsRequestParam, GetDeptsResponseDto } from "@/lib/api/dept/deptDto";



export async function getDeptsApi(reqParam: GetDeptsRequestParam):Promise<GetDeptsResponseDto[] | null> {

  const dialog = useDialogStore();

  const query = `ord_id=${reqParam.org_id}`
  return await apiRequest({
    method: "GET",
    path: `api/departments?${query}`,
    auth: true
  }).then(async (res: ApiResponse<GetDeptsResponseDto[]>) => {
    if (res.data) {
      return res.data;
    }
    return null;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '부서 리스트 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}