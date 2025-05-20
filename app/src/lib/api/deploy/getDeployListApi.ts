import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetDeployListRequestParam, GetDeployListResponseDto } from "@/lib/api/deploy/deployDto";

export async function getDeployListApi(reqDto: GetDeployListRequestParam):Promise<GetDeployListResponseDto[] | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.name}/deployments`,
    auth: true
  }).then(async (res: ApiResponse<GetDeployListResponseDto[]>) => {
    if (!res.data) return null;
    return res.data;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '디플로이먼트 리스트 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}