import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateOrgRequestDto, UpdateOrgResponseDto } from "@/lib/api/org/orgDto";

export async function updateOrgsApi(reqDto: UpdateOrgRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "PATCH",
    path: `api/organizations/${reqDto.orgId}`,
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<UpdateOrgResponseDto>) => {
    if (res.data) {
      dialog.open({
        title: '조직 수정이 완료되었습니다.',
        message: `org: ${res.data.orgName}`,
        type: 'mainframe'
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '조직 수정 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}