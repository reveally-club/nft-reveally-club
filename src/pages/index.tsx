/* eslint-disable react-hooks/exhaustive-deps */
import Headers from "../components/headers";
import Layout from "../components/layout";
import NftCard, { NftProps } from "../components/nft-card";
import { useNfts } from "../hooks/fetcher";
import { useAppSelector } from "../state/hooks";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

export default function Home() {
  const searchText = useAppSelector((state) => state.search.text)
  const { data, isLoading, isValidating, setSize } = useNfts(searchText);
  const observationTarget = useIntersectionObserver(() => {
    !isValidating && setSize((size) => size + 1);
  });

  return (
    <Layout>
      <Headers />
      <div className="mt-10 grid gap-4 lg:grid-cols-4 grid-cols-1">
        {isLoading ? (
          <div />
        ) : (
          data.map((data: NftProps) => (
            <NftCard
              key={data._id}
              _id={data._id}
              profile={data.profile}
              name={data.name}
              twitter={data.twitter}
              discord={data.discord}
              homepage={data.homepage}
              contract={data.contract}
              market={data.market}
            />
          ))
        )}
      </div>
      {!isLoading && <div ref={observationTarget} />}
    </Layout>
  );
}
