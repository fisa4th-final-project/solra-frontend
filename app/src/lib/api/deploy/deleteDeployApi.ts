import type { DeleteDeployQueryParam } from "@/lib/api/deploy/deployDto";
import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";

export async function deleteDeployApi(reqParam: DeleteDeployQueryParam) {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "DELETE",
    path: `api/clusters/${reqParam.clusterId}/namespaces/${reqParam.nsName}/deployments/${reqParam.name}`,
    auth: true
  }).then((res) => {
    dialog.open({
      title: "디플로이먼트 삭제 성공",
      message: `${res.message}`,
      type: 'mainframe'
    });
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '디플로이먼트 삭제 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}