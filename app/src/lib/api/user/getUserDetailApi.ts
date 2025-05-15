import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetUserDetailQueryParam, GetUserDetailResponseDto } from "@/lib/api/user/userDto";

export async function getUserDetailApi(reqParam: GetUserDetailQueryParam):Promise<GetUserDetailResponseDto | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/users/${reqParam.userId}`,
    auth: true
  }).then(async (res: ApiResponse<GetUserDetailResponseDto>) => {
    if (res.data) {
      console.log(res.data);
      return res.data;
    }
    return null;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '사용자 상세정보 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}