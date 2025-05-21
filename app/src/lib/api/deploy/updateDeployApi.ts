import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateDeployRequestDto, UpdateDeployResponseDto } from "@/lib/api/deploy/deployDto";

export async function updateDeployApi(reqDto: UpdateDeployRequestDto) {

const dialog = useDialogStore();

  await apiRequest({
    method: "PATCH",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/deployments/${reqDto.name}`,
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<UpdateDeployResponseDto>) => {
    if (res.data) {
      dialog.open({
        title: '디플로이먼트 수정이 완료되었습니다.',
        message: `Deploy: ${res.data.name}`,
        type: 'mainframe'
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '디플로이먼트 수정 실패',
      message: e.res.message,
      type: 'mainframe'
    });
  });
}