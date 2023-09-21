import { LayoutContent } from "~/components/Layout";
import { ConsejoForm } from "~/components/consejo-comunal/consejoForm";

const Create = () => {
  return (
    <LayoutContent>
      <div className="container my-4 max-w-2xl ">
        <ConsejoForm />
      </div>
    </LayoutContent>
  );
};

export default Create;
