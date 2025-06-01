import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetPodDetailRequestParam, GetPodDetailResponseDto } from "@/lib/api/pod/podDto";

export async function getPodDetailApi(reqDto: GetPodDetailRequestParam):Promise<GetPodDetailResponseDto | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/pods/${reqDto.name}`,
    auth: true
  }).then(async (res: ApiResponse<GetPodDetailResponseDto>) => {
    if (!res.data) return null;
    return res.data;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '파드 상세 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}