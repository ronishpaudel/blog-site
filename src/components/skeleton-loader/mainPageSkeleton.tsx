import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "./cardSkeleton";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";

const MainPageSkeleton = ({ amount }: any) => {
  const loadCards = Array(amount).fill(1);

  const themeSnap = useSnapshot(themeStore);
  return loadCards.map((card, i) => (
    <main
      style={{
        backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
      }}
    >
      <div key={i} className="main-skeleton mt-20">
        <div>
          <div className="image-wrappper-skeleton mt-10 w-full">
            <Skeleton height={678} />
          </div>
          <div className=" mt-20 mb-20 h-10 flex flex-col items-center">
            <Skeleton height={90} width={600} />
          </div>
          <div className="flex-wrap flex justify-center gap-7 w-full">
            <CardSkeleton amount={9} />
          </div>
          <div className="mt-10 mb-5 flex flex-col items-center">
            <Skeleton width={150} height={40} />
          </div>
          <div className="mt-20 mb-20 h-10 flex flex-col items-center">
            <Skeleton height={90} width={600} />
          </div>
        </div>
      </div>
    </main>
  ));
};

export default MainPageSkeleton;
