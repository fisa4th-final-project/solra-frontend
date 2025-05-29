import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateOrgRequestDto, CreateOrgResponseDto } from "@/lib/api/org/orgDto";

export async function createOrgApi(reqDto: CreateOrgRequestDto): Promise<CreateOrgResponseDto | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "POST",
    path: "api/organizations",
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<CreateOrgResponseDto>) => {
    if (!res.data) return null;
    console.log(res.data);
    dialog.open({
      title: '조직 생성이 완료되었습니다.',
      message: res.data.orgName,
      type: 'mainframe'
    });
    return res.data;
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '조직 생성 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}