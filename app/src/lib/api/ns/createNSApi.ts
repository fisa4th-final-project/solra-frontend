import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateNSRequestDto, CreateNSResponseDto } from "@/lib/api/ns/nsDto";

export async function createNSApi(reqDto: CreateNSRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "POST",
    path: `api/clusters/${reqDto.clusterId}/namespaces`,
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<CreateNSResponseDto>) => {
    if (res.data) {
      console.log(res.data);
      dialog.open({
        title: '네임스페이스 생성이 완료되었습니다.',
        message: res.data.name,
        type: 'mainframe'
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '네임스페이스 생성 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}