import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Button from "../components/Button";
import SignIn from "../components/SignIn";
import { Click, getLatestClick } from "../server/router/button";
import { trpc } from "../utils/trpc";
import GitHubForkRibbon from "react-github-fork-ribbon";

export async function getServerSideProps() {
  const result = await getLatestClick();
  return {
    props: result, // will be passed to the page component as props
  };
}

const Home: NextPage<Click, {}> = (props) => {
  const lastClickedQuery = trpc.useQuery(["button.lastClicked"]);
  const buttonClickedMutation = trpc.useMutation(["button.clicked"], {
    onSuccess: () => {
      lastClickedQuery.refetch();
    },
  });

  const { data: session } = useSession();

  function signInOrMutate() {
    if (!session?.user) {
      signIn();
    } else {
      buttonClickedMutation.mutate();
    }
  }

  const isRefetching = lastClickedQuery.isRefetching;

  const lastPerson = lastClickedQuery.isLoading
    ? props
    : lastClickedQuery.data!;

  return (
    <>
      <Head>
        <title>The Button</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GitHubForkRibbon
        href="https://github.com/philals/the-button"
        target="_blank"
        position="right"
      >
        Fork me on GitHub
      </GitHubForkRibbon>
      <SignIn />
      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <p className="inline text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          The last person to click{" "}
          <Button disabled={isRefetching} onClick={signInOrMutate}>
            this Button
          </Button>{" "}
          was{" "}
          <Image
            alt="Last person to click the button"
            src={lastPerson.imageUrl!}
            width="48"
            height="48"
          />
          {" on "}
          <span className="text-blue-300">
            {lastPerson.createdAt.toLocaleString()}
          </span>
        </p>
      </main>
    </>
  );
};

export default Home;
