import { useSession, signIn, signOut } from "next-auth/react";

export default function SignIn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <span className="text-zinc-500">
        Signed in as {session.user!.email} <br />
        <button className="text-zinc-500" onClick={() => signOut()}>
          Sign out
        </button>
      </span>
    );
  }
  return (
    <span className="text-zinc-500">
      Not signed in <br />
      <button className="text-zinc-500" onClick={() => signIn()}>
        Sign in
      </button>
    </span>
  );
}
