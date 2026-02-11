import Swib from "./swiber/slider";
export default function Intro() {
  const deals = [
    {
      offer: "Limited Time Offer 30% Off",
      details: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      image: "/eztpmcwxkww1mlqijtse.avif",
      link: "/a",
    },
    {
      offer: "Limited Time Offer 30% Off",
      details: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      image: "/eztpmcwxkww1mlqijtse.avif",
      link: "/a",
    },
    {
      offer: "Limited Time Offer 30% Off",
      details: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      image: "/eztpmcwxkww1mlqijtse.avif",
      link: "/a",
    },
  ];

  return (
    <section>
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
