import { apiRequest } from "@/lib/global/apiHandler";
import type { LoginRequestDto, LoginResponseDto } from "@/lib/api/user/userDto";
import { ApiError } from "@/lib/global/customError";
import { router } from "@/router";
import { useDialogStore } from "@/store/dialog";
import { useAuthStore } from "@/store/auth";
import type { ApiResponse } from "@/lib/global/ApiResponse";

export async function loginApi(reqDto: LoginRequestDto) {

  const dialog = useDialogStore();
  const auth = useAuthStore();

  await apiRequest({
    method: "POST",
    path: "api/auth/login",
    body: reqDto,
  }).then(async (res: ApiResponse<LoginResponseDto>) => {
    if (res.data) {
      auth.login(res.data);
      console.log(auth.$state);
      await router.push('/');
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '로그인 실패',
      message: e.res.message
    });

  });
}