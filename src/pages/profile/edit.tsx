import { GetServerSidePropsContext } from "next";
import { EditForm } from "../../components/profile/editForm";
import { verifySession } from "~/utils/verifySession";

export default function Editar() {
  return (
    <div className="grid place-content-center ">
      <EditForm />
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
