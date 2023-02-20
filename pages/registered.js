import RegisteredPage from "../components/RegisteredPage";
import data from "../BasicData.json";
export default function Registered() {
  return (
    <>
      <RegisteredPage data={data.status} />
    </>
  );
}
