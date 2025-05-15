import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateUserRequestDto, CreateUserResponseDto } from "@/lib/api/user/userDto";
import { router } from "@/router";

export async function createUserApi(reqDto: CreateUserRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "POST",
    path: "api/users",
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<CreateUserResponseDto>) => {
    if (res.data) {
      console.log(res.data);
      dialog.open({
        title: '사용자 생성이 완료되었습니다.',
        message: res.data.email,
        type: 'mainframe'
      });
      router.back();
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '사용자 생성 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}