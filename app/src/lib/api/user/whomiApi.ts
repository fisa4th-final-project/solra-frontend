import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import { useAuthStore } from "@/store/auth";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { WhomiResponseDto } from "@/lib/api/user/userDto";

export async function whomiApi() {

  const dialog = useDialogStore();
  const auth = useAuthStore();

  await apiRequest({
    method: "GET",
    path: "api/auth/me",
    auth: true
  }).then(async (res: ApiResponse<WhomiResponseDto>) => {
    if (res.data) {
      /*
      todo:
      1. 내 정보 조회 리팩토링 이후 deptName, orgName 할당
      */
      auth.whomi({
        userName: res.data.userName,
        deptName: '인프라 통합',
        orgName: '우리 카드'
      })
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '내 정보조회 실패',
      message: e.res.message
    });

  });
}