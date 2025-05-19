import type { DeletePermQueryParam } from "@/lib/api/perm/permDto";
import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";

export async function deletePermApi(reqParam: DeletePermQueryParam) {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "DELETE",
    path: `api/permissions/${reqParam.permId}`,
    auth: true
  }).then((res) => {
    dialog.open({
      title: "권한 삭제 성공",
      message: `${res.message}`,
      type: 'mainframe'
    });
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '권한 삭제 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}