import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { router } from "@/router";
import { useDialogStore } from "@/store/dialog";
import { useAuthStore } from "@/store/auth";
import type { ApiResponse } from "@/lib/global/ApiResponse";

export async function logoutApi() {

  const dialog = useDialogStore();
  const auth = useAuthStore();

  await apiRequest({
    method: "POST",
    path: "api/auth/logout"
  }).then(async (res: ApiResponse<null>) => {
    if (res.data) {
      auth.logout();
      console.log(auth.$state);
      await router.push('/login');
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '로그아웃 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}