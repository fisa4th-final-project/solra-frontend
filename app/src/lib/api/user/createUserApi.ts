import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateUserRequestDto, CreateUserResponseDto } from "@/lib/api/user/userDto";
import { useResStore } from "@/store/response";

export async function createUserApi(reqDto: CreateUserRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "POST",
    path: "api/users",
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<CreateUserResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}