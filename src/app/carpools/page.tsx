import ky from "ky";
import CarpoolsMap from "../../components/map/map";

interface SearchParams {
  search_params: string;
}

export default async function Carpools({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const event_code_param: string = searchParams["event-code"] as string;

  let res: unknown;
  try {
    res = await ky
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/carpools?event-code=${event_code_param}`,
      )
      .json();
  } catch (error) {
    console.error(error);
  }

  return <CarpoolsMap event_data={res} />;
}
