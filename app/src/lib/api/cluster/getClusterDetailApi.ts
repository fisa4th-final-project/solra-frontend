import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetClusterDetailRequestParam, GetClusterDetailResponseDto } from "@/lib/api/cluster/clusterDto";

export async function getClusterDetailApi(reqDto: GetClusterDetailRequestParam):Promise<GetClusterDetailResponseDto | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}`,
    auth: true
  }).then(async (res: ApiResponse<GetClusterDetailResponseDto>) => {
    if (!res.data) return null;
    return res.data;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '클러스터 상세 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}