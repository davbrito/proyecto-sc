import { Card, CardBody, Link } from "@nextui-org/react";
import { type GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { LayoutContent } from "~/components/Layout";
import { CensoList } from "~/components/censo/CensoList";
import { SearchForm } from "~/components/censo/SearchForm";
import { verifySession } from "~/utils/verifySession";

const CensoIndex = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();

  const consejoComunalId = router.query.id ? router.query.id.toString() : "";

  return (
    <LayoutContent>
      <div className="container">
        <div className="my-4 flex flex-col gap-4 md:flex-row-reverse">
          <Card className="flex flex-row flex-wrap items-center justify-evenly self-stretch">
            <Link
              href={`/consejo-comunal/${consejoComunalId}/censo/create`}
              className=" my-4 h-fit w-fit rounded-md bg-green-700 px-4 py-3 text-lg text-white"
            >
              Nuevo censo
            </Link>

            <Link
              href={`/consejo-comunal/${consejoComunalId}/censo/estadisticas`}
              className=" my-4 h-fit w-fit rounded-md bg-orange-600 px-4 py-3 text-lg text-white"
            >
              Ver estadisticas
            </Link>
          </Card>
          <SearchForm setSearchValue={setSearchValue} />
        </div>
        <Card className="mb-4">
          <CardBody>
            <h1 className=" text-center text-4xl font-medium ">
              Datos del Censo
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
