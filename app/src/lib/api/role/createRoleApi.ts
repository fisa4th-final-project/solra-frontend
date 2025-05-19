import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateRoleRequestDto, CreateRoleResponseDto } from "@/lib/api/role/roleDto";

export async function createRoleApi(reqDto: CreateRoleRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "POST",
    path: "api/roles",
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<CreateRoleResponseDto>) => {
    if (res.data) {
      dialog.open({
        title: '역할 생성이 완료되었습니다.',
        message: res.data.roleName,
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