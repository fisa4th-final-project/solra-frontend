import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateRolePermRequestDto, CreateRolePermResponseDto } from "@/lib/api/rolePerm/rolePermDto";

export async function createRolePermApi(reqDto: CreateRolePermRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "POST",
    path: "api/role-permissions",
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<CreateRolePermResponseDto>) => {
    if (res.data) {
      dialog.open({
        title: '역할에 권한 부여가 완료되었습니다.',
        message: res.message,
        type: 'mainframe'
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '역할에 권한 부여 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}