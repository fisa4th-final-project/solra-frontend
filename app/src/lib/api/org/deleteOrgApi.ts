import type { DeleteOrgQueryParam } from "@/lib/api/org/orgDto";
import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";


export async function deleteOrgApi(reqParam: DeleteOrgQueryParam) {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "DELETE",
    path: `api/organizations/${reqParam.orgId}`,
    auth: true
  }).then((res) => {
    dialog.open({
      title: "조직 삭제 성공",
      message: `${res.message}`,
      type: 'mainframe'
    });
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '조직 삭제 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}