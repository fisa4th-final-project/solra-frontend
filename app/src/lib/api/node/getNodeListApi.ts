import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetNodeListRequestParam, GetNodeListResponseDto } from "@/lib/api/node/nodeDto";

export async function getNodeListApi(reqDto: GetNodeListRequestParam):Promise<GetNodeListResponseDto[] | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/nodes`,
    auth: true
  }).then(async (res: ApiResponse<GetNodeListResponseDto[]>) => {
    if (!res.data) return null;
    return res.data;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '노드 리스트 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}