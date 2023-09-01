import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = ({ amount }: any) => {
  const loadCards = Array(amount).fill(1);
  return loadCards.map((card, i) => (
    <div className="card-skeleton" key={i}>
      <div style={{ height: "250px", width: "360px", padding: "10px" }}>
        <Skeleton style={{ height: "250px", borderRadius: "6px" }} />
      </div>
      <div className="mt-6 flex flex-col justify-center">
        <div>
          <Skeleton className="" />
        </div>
        <div>
          <Skeleton count={2} />
        </div>
        <div className="flex gap-5 items-center">
          <Skeleton circle width={40} height={40} />

          <Skeleton width={100} />
          <Skeleton width={176} />
        </div>
      </div>
    </div>
  ));
};

export default CardSkeleton;
