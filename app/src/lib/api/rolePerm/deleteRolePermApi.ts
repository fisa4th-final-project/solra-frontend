import type { DeleteRolePermRequestDto } from "@/lib/api/rolePerm/rolePermDto";
import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";


export async function deleteRolePermApi(reqParam: DeleteRolePermRequestDto) {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "DELETE",
    path: `api/role-permissions`,
    body: reqParam,
    auth: true
  }).then((res) => {
    dialog.open({
      title: "권한 회수 성공",
      message: `${res.message}`,
      type: 'mainframe'
    });
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '권한 회수 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}