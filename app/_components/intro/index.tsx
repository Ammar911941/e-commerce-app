import { getDeals } from "@/service/deals";
import Swib from "./swiber/slider";
export default async function Intro() {
  const deals = await getDeals();
  return (
    <section className="mt-25">
      <div className="container max-w-7xl m-auto p-5">
        {deals.length ? (
          <Swib deals={deals} />
        ) : (
          <p className="font-medium text-2xl text-blue-950 mb-5  text-center">
            No Deals Founded
          </p>
        )}
      </div>
    </section>
  );
}
