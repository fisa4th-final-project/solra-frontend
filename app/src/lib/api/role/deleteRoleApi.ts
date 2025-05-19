import type { DeleteRoleQueryParam } from "@/lib/api/role/roleDto";
import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";


export async function deleteRoleApi(reqParam: DeleteRoleQueryParam) {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "DELETE",
    path: `api/roles/${reqParam.roleId}`,
    auth: true
  }).then((res) => {
    dialog.open({
      title: "역할 삭제 성공",
      message: `${res.message}`,
      type: 'mainframe'
    });
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '역할 삭제 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}