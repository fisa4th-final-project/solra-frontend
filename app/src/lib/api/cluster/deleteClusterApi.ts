import type { DeleteClusterQueryParam } from "@/lib/api/cluster/clusterDto";
import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";


export async function deleteClusterApi(reqParam: DeleteClusterQueryParam) {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "DELETE",
    path: `api/clusters/${reqParam.clusterId}`,
    auth: true
  }).then((res) => {
    dialog.open({
      title: "클러스터 정보 삭제 성공",
      message: `${res.message}`,
      type: 'mainframe'
    });
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '클러스터 정보 삭제 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}