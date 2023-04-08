import { useSession, signIn } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  if (!session) {
    // Handle unauthenticated state, e.g. render a SignIn component
    return <div>Sign in</div>;
  }

  return <p>Welcome {session.user.name}!</p>;
};

export default User;
