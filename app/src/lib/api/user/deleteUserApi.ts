import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { DeleteUserQueryParam } from "@/lib/api/user/userDto";

export async function deleteUserApi(reqParam: DeleteUserQueryParam) {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "DELETE",
    path: `api/users/${reqParam.userId}`,
    auth: true
  }).then((res) => {
    dialog.open({
      title: "사용자 삭제 성공",
      message: `${res.message}`,
      type: 'mainframe'
    });
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '사용자 삭제 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}