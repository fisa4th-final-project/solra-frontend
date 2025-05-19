import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateRoleRequestDto, UpdateRoleResponseDto } from "@/lib/api/role/roleDto";

export async function updateRoleApi(reqDto: UpdateRoleRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "PATCH",
    path: `api/roles/${reqDto.roleId}`,
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<UpdateRoleResponseDto>) => {
    if (res.data) {
      dialog.open({
        title: '역할 수정이 완료되었습니다.',
        message: `role: ${res.data.roleName}`,
        type: 'mainframe'
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '역할 수정 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}