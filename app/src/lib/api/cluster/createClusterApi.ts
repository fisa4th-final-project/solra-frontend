import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateClusterRequestDto, CreateClusterResponseDto } from "@/lib/api/cluster/clusterDto";

export async function createClusterApi(reqDto: CreateClusterRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "POST",
    path: "api/clusters",
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<CreateClusterResponseDto>) => {
    if (res.data) {
      console.log(res.data);
      dialog.open({
        title: '클러스터 정보 생성이 완료되었습니다.',
        message: res.data.name,
        type: 'mainframe'
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '클러스터 정보 생성 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}