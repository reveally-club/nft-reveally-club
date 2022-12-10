import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { NftProps } from "../components/nft-card";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useNfts = (search: string) => {
  const getKey = (
    pageIndex: number,
    previousPageData: { message: string; data: Array<NftProps> }
  ) => {
    if (pageIndex === 0)
      return `${process.env.NEXT_PUBLIC_BASE_URL}/nft?page=1&search=${search}`;
    if (pageIndex + 1 > previousPageData?.data?.length) return null;
    return `${process.env.NEXT_PUBLIC_BASE_URL}/nft?page=${pageIndex + 1}&search={}`;
  };

  const { data, error, isValidating, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateAll: false,
  });

  const post = data ? data.map((item: NftProps) => item).flat() : [];

  return {
    data: post,
    isLoading: !error && !data,
    isError: error,
    isValidating: isValidating,
    size: size,
    setSize: setSize,
  };
};

export { useNfts };
