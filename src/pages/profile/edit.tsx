import { type GetServerSidePropsContext } from "next";
import { EditForm } from "../../components/profile/editForm";
import { verifySession } from "~/utils/verifySession";
import { LayoutContent } from "~/components/Layout";

export default function Editar() {
  return (
    <LayoutContent className="flex flex-col items-center justify-center">
      <EditForm />
    </LayoutContent>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
