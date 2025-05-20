import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateClusterRequestDto, UpdateClusterResponseDto } from "@/lib/api/cluster/clusterDto";

export async function updateClusterApi(reqDto: UpdateClusterRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "PATCH",
    path: `api/clusters/${reqDto.clusterId}`,
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<UpdateClusterResponseDto>) => {
    if (res.data) {
      dialog.open({
        title: '클러스터 정보 수정이 완료되었습니다.',
        message: `Cluster: ${res.data.name}`,
        type: 'mainframe'
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '클러스터 정보 수정 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}