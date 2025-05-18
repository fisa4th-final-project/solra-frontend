import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetOrgDetailRequestDto, GetOrgDetailResponseDto } from "@/lib/api/org/orgDto";


export async function getOrgDetailApi(reqDto: GetOrgDetailRequestDto):Promise<GetOrgDetailResponseDto | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/organizations/${reqDto.orgId}`,
    auth: true
  }).then(async (res: ApiResponse<GetOrgDetailResponseDto>) => {
    if (res.data) {
      return res.data;
    }
    return null;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '조직 상세 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}