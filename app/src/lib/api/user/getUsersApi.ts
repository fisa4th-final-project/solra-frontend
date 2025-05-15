import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetUsersQueryParam, GetUsersResponseDto } from "@/lib/api/user/userDto";

export async function getUsersApi(reqParam: GetUsersQueryParam):Promise<GetUsersResponseDto | null> {

  const dialog = useDialogStore();

  const page = reqParam.page >= 0 ? `page=${reqParam.page}` : null
  const size = reqParam.size >= 0 ? `size=${reqParam.size}` : null

  let query = '';
  const params = [page, size].filter(Boolean).join('&');

  if (params) {
    query = `?${params}`;
  }

  return await apiRequest({
    method: "GET",
    path: `api/users${query}`,
    auth: true
  }).then(async (res: ApiResponse<GetUsersResponseDto>) => {
    if (res.data) {
      return res.data;
    }
    return null;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '사용자 리스트 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}