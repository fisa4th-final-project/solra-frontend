import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetDeptDetailRequestParam, GetDeptDetailResponseDto } from "@/lib/api/dept/deptDto";

export async function getDeptDetailApi(reqDto: GetDeptDetailRequestParam):Promise<GetDeptDetailResponseDto | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/departments/${reqDto.deptId}`,
    auth: true
  }).then(async (res: ApiResponse<GetDeptDetailResponseDto>) => {
    if (res.data) {
      return res.data;
    }
    return null;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '부서 상세 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}