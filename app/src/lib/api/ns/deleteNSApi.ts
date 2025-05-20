import type { DeleteNSQueryParam } from "@/lib/api/ns/nsDto";
import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";

export async function deleteNSApi(reqParam: DeleteNSQueryParam) {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "DELETE",
    path: `api/clusters/${reqParam.clusterId}/namespaces/${reqParam.name}`,
    auth: true
  }).then((res) => {
    dialog.open({
      title: "네임스페이스 삭제 성공",
      message: `${res.message}`,
      type: 'mainframe'
    });
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '네임스페이스 삭제 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}