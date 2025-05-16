import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import { router } from "@/router";
import type { CreateDeptRequestDto, CreateDeptResponseDto } from "@/lib/api/dept/deptDto";

export async function createDeptApi(reqDto: CreateDeptRequestDto) {

  const dialog = useDialogStore();

  await apiRequest({
    method: "POST",
    path: "api/departments",
    body: reqDto,
    auth: true
  }).then(async (res: ApiResponse<CreateDeptResponseDto>) => {
    if (res.data) {
      console.log(res.data);
      dialog.open({
        title: '부서 생성이 완료되었습니다.',
        message: res.data.deptName,
        type: 'mainframe'
      });
    }
  }).catch((e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '부서 생성 실패',
      message: e.res.message,
      type: 'mainframe'
    });

  });
}