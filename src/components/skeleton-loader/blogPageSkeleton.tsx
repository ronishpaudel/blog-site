import Skeleton from "react-loading-skeleton";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import Footer from "../Footer";
import Header from "../Header";

const BlogPageSkeleton = ({ amount }: any) => {
  const loadCards = Array(amount).fill(1);
  const themeSnap = useSnapshot(themeStore);
  return loadCards.map((card, i) => (
    <div key={i}>
      <Header />
      <div
        className="flex justify-center"
        style={{
          backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
        }}
      >
        <div className="blog-wrapper">
          <div className="blog-info">
            <div>
              <Skeleton width={100} height={30} />
            </div>
            <div>
              <Skeleton count={4} />
            </div>

            <div className="flex gap-5 items-center">
              <Skeleton circle width={40} height={40} />

              <Skeleton width={100} />
              <Skeleton width={100} />
            </div>

            <div className="image-wrappper-skeleton">
              <Skeleton style={{ height: "500px" }} />
            </div>
            <div>
              <Skeleton count={4} />
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  ));
};

export default BlogPageSkeleton;
