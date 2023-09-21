import { type GetServerSidePropsContext } from "next";
import { LayoutContent } from "~/components/Layout";
import FamiliarForm from "~/components/familiar/FamiliarForm";
import { verifySession } from "~/utils/verifySession";

const CreateFamiliar = () => {
  return (
    <LayoutContent>
      <h2>Nuevo Familiar</h2>
      <div className="container max-w-2xl p-8">
        <FamiliarForm consejoId="" />
      </div>
    </LayoutContent>
  );
};

export default CreateFamiliar;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
