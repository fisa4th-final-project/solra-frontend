import { apiRequest } from "@/lib/global/apiHandler";
import type { LoginRequestDto, LoginResponseDto } from "@/lib/api/user/userDto";
import type { ApiResponse } from "@/lib/global/ApiResponse";

export async function loginApi(reqDto: LoginRequestDto) {

  const res: ApiResponse<LoginResponseDto> = await apiRequest({
      method: "POST",
      path: "/api/auth/login",
      body: reqDto,
    });

  return res;
}