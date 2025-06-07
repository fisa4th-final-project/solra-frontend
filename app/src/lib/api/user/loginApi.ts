import { apiRequest } from "@/lib/global/apiHandler";
import type { LoginRequestDto, LoginResponseDto } from "@/lib/api/user/userDto";
import { ApiError } from "@/lib/global/customError";
import { router } from "@/router";
import { useAuthStore } from "@/store/auth";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import { useResStore } from "@/store/response";

export async function loginApi(reqDto: LoginRequestDto) {
  const resStore = useResStore();
  const auth = useAuthStore();
  await apiRequest({
    method: "POST",
    path: "api/auth/login",
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<LoginResponseDto>) => {
    if (res.data) {
      auth.login(res.data);
      resStore.push(res);
      await router.push('/');
    }
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  });
}