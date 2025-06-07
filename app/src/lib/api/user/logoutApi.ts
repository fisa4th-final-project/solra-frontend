import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { router } from "@/router";
import { useAuthStore } from "@/store/auth";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import { useResStore } from "@/store/response";

export async function logoutApi() {
  const resStore = useResStore();
  const auth = useAuthStore();
  await apiRequest({
    method: "POST",
    path: "api/auth/logout"
  }).then(async (res: ApiResponse<null>) => {
    auth.logout();
    resStore.push(res);
    await router.push('/login');
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  });
}