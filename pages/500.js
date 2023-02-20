import Error500Page from "../components/Error500Page";
import data from "../BasicData.json";

export default function Error500() {
  return (
    <>
      <Error500Page data={data.status} />
    </>
  );
}
