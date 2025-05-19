import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreatePermRequestDto, CreatePermResponseDto } from "@/lib/api/perm/permDto";

export async function createPermApi(reqDto: CreatePermRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "POST",
    path: "api/permissions",
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<CreatePermResponseDto>) => {
    if (res.data) {
      dialog.open({
        title: '역할 생성이 완료되었습니다.',
        message: res.data.permissionName,
        type: 'mainframe'
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '역할 생성 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}