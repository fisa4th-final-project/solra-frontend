import type { DeleteDeptQueryParam } from "@/lib/api/dept/deptDto";
import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";


export async function deleteDeptApi(reqParam: DeleteDeptQueryParam) {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "DELETE",
    path: `api/departments/${reqParam.deptId}`,
    auth: true
  }).then((res) => {
    dialog.open({
      title: "부서 삭제 성공",
      message: `${res.message}`,
      type: 'mainframe'
    });
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '부서 삭제 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}