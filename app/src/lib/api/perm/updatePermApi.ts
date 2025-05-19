import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdatePermRequestParam, UpdatePermResponseDto } from "@/lib/api/perm/permDto";

export async function updatePermApi(reqDto: UpdatePermRequestParam) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "PATCH",
    path: `api/permissions/${reqDto.permId}`,
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<UpdatePermResponseDto>) => {
    if (!res.data) return null;
    console.log(res.data);
    dialog.open({
      title: '권한 수정 성공',
      message: res.data.permissionName,
      type: 'mainframe'
    });
      
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '권한 수정 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}