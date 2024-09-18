
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const useQueryString = () => {
  const pathname = usePathname()
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryParams = (newParams: { [key: string]: string }) => {
    const params = new URLSearchParams();

    // Thêm hoặc cập nhật các tham số
    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        params.set(key, newParams[key]);
      } else {
        params.delete(key); // Xóa param nếu giá trị là undefined/null
      }
    });
    // Cập nhật URL mà không reload trang
    const queryString = params.toString();
    console.log(queryString)
    router.push(pathname + "?" + queryString);
  };
  // Hàm để cập nhật query param
  const updateQueryParams = (newParams: { [key: string]: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    // Thêm hoặc cập nhật các tham số
    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        params.set(key, newParams[key]);
      } else {
        params.delete(key); // Xóa param nếu giá trị là undefined/null
      }
    });

    // Cập nhật URL mà không reload trang
    const queryString = params.toString();
    console.log(queryString)
    router.push(pathname + "?" + queryString);
  };
  const deleteQueryParam = (key:string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    const queryString = params.toString();
    router.push(`?${queryString}`);
  };
  return { queryParams: searchParams, updateQueryParams , deleteQueryParam ,createQueryParams};
};

export default useQueryString;
