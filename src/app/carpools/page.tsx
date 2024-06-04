import CarpoolMap from "@/components/map";
import ky from "ky";
import CarpoolsMap from "../../components/map";

export default async function Carpools({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const event_code_param = searchParams["event-code"];

  let res: any;
  try {
    res = await ky
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/carpools?event-code=${event_code_param}`,
      )
      .json();
  } catch (error) {
    console.error(error);
  }

  return <CarpoolMap event_data={res} />;
}
