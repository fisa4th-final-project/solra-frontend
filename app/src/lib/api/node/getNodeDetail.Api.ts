import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetNodeDetailRequestParam, GetNodeDetailResponseDto } from "@/lib/api/node/nodeDto";

export async function getNodeDetailApi(reqDto: GetNodeDetailRequestParam):Promise<GetNodeDetailResponseDto | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/nodes/${reqDto.nodeName}`,
    auth: true
  }).then(async (res: ApiResponse<GetNodeDetailResponseDto>) => {
    if (!res.data) return null;
    return res.data;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '노드 상세 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}