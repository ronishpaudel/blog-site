import Skeleton from "react-loading-skeleton";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import Footer from "../Footer";
import Header from "../Header";

const BlogPageSkeleton = ({ amount }: any) => {
  const loadCards = Array(amount).fill(1);
  const themeSnap = useSnapshot(themeStore);
  return loadCards.map((card, i) => (
    <div className="mt-20">
      <Header />
      <div
        className="mt-20"
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

            <div className="image-wrappper-skeleton mt-10">
              <Skeleton style={{ height: "678px" }} />
            </div>
            <div className="mt-10">
              <Skeleton count={10} />
            </div>
            <br />
            <div>
              <Skeleton count={10} />
            </div>
            <br />
            <div>
              <Skeleton count={10} />
            </div>
            <br />
            <div>
              <Skeleton count={10} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ));
};

export default BlogPageSkeleton;
