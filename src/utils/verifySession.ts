import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

export const verifySession = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/error" } };
  }

  return {
    props: {},
  };
};
