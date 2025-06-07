import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateUserRequestDto, UpdateUserResponseDto } from "@/lib/api/user/userDto";
import { useResStore } from "@/store/response";

export async function updateUserApi(reqDto: UpdateUserRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "PATCH",
    path: `api/users/${reqDto.userId}`,
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<UpdateUserResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}