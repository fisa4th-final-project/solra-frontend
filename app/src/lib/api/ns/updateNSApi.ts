import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateNSRequestDto, UpdateNSResponseDto } from "@/lib/api/ns/nsDto";

export async function updateNSApi(reqDto: UpdateNSRequestDto) {

const dialog = useDialogStore();

  await apiRequest({
    method: "PATCH",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.name}`,
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<UpdateNSResponseDto>) => {
    if (res.data) {
      dialog.open({
        title: '네임스페이스 수정이 완료되었습니다.',
        message: `NS: ${res.data.name}`,
        type: 'mainframe'
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '네임스페이스 수정 실패',
      message: e.res.message,
      type: 'mainframe'
    });
  });
}