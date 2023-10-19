import dynamic from "next/dynamic";
const IndexPage = dynamic(() => import("components/IndexPage/IndexPage"), {
  ssr: false,
});

export default function Home() {
  return <IndexPage></IndexPage>;
}
