import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateUserRequestDto, UpdateUserResponseDto } from "@/lib/api/user/userDto";
import { router } from "@/router";

export async function updateUserApi(reqDto: UpdateUserRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "PATCH",
    path: `api/users/${reqDto.userId}`,
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<UpdateUserResponseDto>) => {
    if (res.data) {
      dialog.open({
        title: '사용자 수정이 완료되었습니다.',
        message: `user: ${res.data.userName}`,
        type: 'mainframe'
      });
      router.back();
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '사용자 수정 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}