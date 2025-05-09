import { apiRequest } from "@/lib/global/apiHandler";
import type { LoginRequestDto } from "@/lib/api/user/userDto";
import type { ApiError } from "@/lib/global/customError";
import { router } from "@/router";
import { useDialogStore } from "@/store/dialog";

export async function loginApi(reqDto: LoginRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "POST",
    path: "api/auth/login",
    body: reqDto,
  }).then(async (res) => {
    console.log(res);
    await router.push('/');
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '로그인 실패',
      message: e.res.message
    });

  });
}