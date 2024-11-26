import useSWR from "swr";

interface FareItem {
  search_date: string;
  depart_date: string;
  fare: number;
}

// fetcher 함수 정의
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다");
  }
  const json = await response.json();
  return json.data;
};

export function useFareItems(from: string, to: string, date: string) {
  return useSWR<FareItem[]>(
    from && to && date ? `/api/fares?from=${from}&to=${to}&date=${date}` : null,
    fetcher,
    {
      revalidateOnFocus: false, // 탭 포커스시 재검증 비활성화
      revalidateOnReconnect: false, // 재연결시 재검증 비활성화
      dedupingInterval: 600000, // 10분간 중복 요청 방지
    }
  );
}