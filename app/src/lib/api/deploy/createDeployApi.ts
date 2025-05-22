import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateDeployRequestDto, CreateDeployResponseDto } from "@/lib/api/deploy/deployDto";

export async function createDeployApi(reqDto: CreateDeployRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "POST",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/deployments`,
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<CreateDeployResponseDto>) => {
    if (res.data) {
      console.log(res.data);
      dialog.open({
        title: '디플로이먼트 생성이 완료되었습니다.',
        message: res.data.name,
        type: 'mainframe'
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '디플로이먼트 생성 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}