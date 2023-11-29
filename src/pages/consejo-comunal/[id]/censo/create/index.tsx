import { useRouter } from "next/router";
import { LayoutContent } from "~/components/Layout";
import { GreatForm } from "~/components/censo/GreatForm";
import { JefeForm } from "~/components/censo/JefeForm";

const CreateCenso = () => {
  const router = useRouter();
  const consejoComunalId = router.query.id ? router.query.id.toString() : "";
  return (
    <LayoutContent>
      <div className="container mx-auto max-w-2xl p-8">
        <GreatForm consejoComunalId={consejoComunalId} />
        {/* <JefeForm consejoComunalId={consejoComunalId} /> */}
      </div>
    </LayoutContent>
  );
};

export default CreateCenso;
