import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateSvcRequestDto, UpdateSvcResponseDto } from "@/lib/api/svc/svcDto";

export async function updateSvcApi(reqDto: UpdateSvcRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "PATCH",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/services/${reqDto.name}`,
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<UpdateSvcResponseDto>) => {
    if (res.data) {
      dialog.open({
        title: '서비스 수정이 완료되었습니다.',
        message: `SVC: ${res.data.name}`,
        type: 'mainframe'
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '서비스 수정 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}