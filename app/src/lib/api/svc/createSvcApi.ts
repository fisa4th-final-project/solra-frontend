import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateSvcRequestDto, CreateSvcResponseDto } from "@/lib/api/svc/svcDto";

export async function createSvcApi(reqDto: CreateSvcRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "POST",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/services`,
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<CreateSvcResponseDto>) => {
    if (res.data) {
      dialog.open({
        title: '서비스 생성이 완료되었습니다.',
        message: res.data.name,
        type: 'mainframe'
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '서비스 생성 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}