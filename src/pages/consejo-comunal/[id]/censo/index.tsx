import { Card, CardBody, Link } from "@nextui-org/react";
import { type GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { LayoutContent } from "~/components/Layout";
import { CensoList } from "~/components/censo/CensoList";
import { SearchForm } from "~/components/censo/SearchForm";
import { api } from "~/utils/api";
import { verifySession } from "~/utils/verifySession";

const CensoIndex = () => {
  const router = useRouter();
  const consejoComunalId = router.query.id ? router.query.id.toString() : "";
  const [searchValue, setSearchValue] = useState<string>("");
  const { data } = api.consejo.getById.useQuery({
    id: parseInt(consejoComunalId),
  });

  return (
    <LayoutContent>
      <div className="container mx-auto">
        <div className="my-4 flex flex-col items-center gap-4 md:flex-row md:justify-evenly ">
          <Card className="flex flex-row flex-wrap items-center justify-evenly gap-2  p-5">
            <Link
              href={`/consejo-comunal/${consejoComunalId}/censo/create`}
              className="h-fit  w-fit rounded-md bg-green-700 px-4 py-3 font-medium  text-white"
            >
              Nuevo censo
            </Link>

            <Link
              href={`/consejo-comunal/${consejoComunalId}/censo/estadisticas`}
              className="h-fit  w-fit rounded-md bg-orange-600 px-4 py-3 font-medium  text-white"
            >
              Estadisticas
            </Link>
            {/* <Link
              // size={"sm"}
              className="inline-block capitalize text-xs cursor-pointer rounded-md  px-3 py-2 bg-blue-600 text-white transition-all hover:bg-blue-800 disabled:bg-blue-800"
              href={`/consejo-comunal/${consejoComunalId}/lider/${id}`}
            >
              Ver mi manzana
            </Link> */}
          </Card>
          <SearchForm setSearchValue={setSearchValue} />
        </div>
        <Card className="mb-4">
          <CardBody>
            <h1 className=" text-center text-3xl font-medium ">
              {data && (
                <>
                  Censados de la comunidad{" "}
                  <span className="uppercase">{data?.comunidad}</span>
                </>
              )}
            </h1>

            <div className="container mt-4">
              <CensoList search={searchValue} consejoId={consejoComunalId} />
            </div>
          </CardBody>
        </Card>
      </div>
    </LayoutContent>
  );
};

export default CensoIndex;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
