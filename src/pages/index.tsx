import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Button from "../components/Button";
import SignIn from "../components/SignIn";
import { DefaultQueryCell } from "../utils/DefaultQueryCell";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
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

  const isLoading =
    lastClickedQuery.isRefetching || buttonClickedMutation.isLoading;

  return (
    <>
      <Head>
        <title>The Button</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignIn />
      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <DefaultQueryCell
          query={lastClickedQuery}
          success={({ data }) => {
            return (
              <>
                <p className="inline text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
                  The last person to click{" "}
                  <Button disabled={isLoading} onClick={signInOrMutate}>
                    this Button
                  </Button>{" "}
                  was{" "}
                  <Image
                    alt="Last person to click the button"
                    src={data.imageUrl!}
                    width="48"
                    height="48"
                  />
                  {" on "}
                  <span className="text-blue-300">
                    {data?.createdAt.toLocaleString()}
                  </span>
                </p>
              </>
            );
          }}
          empty={() => (
            <>
              <p>Err.. there is meant to be data here</p>{" "}
              <Button onClick={() => buttonClickedMutation.mutate()}>
                Button
              </Button>
            </>
          )}
        />
      </main>
    </>
  );
};

export default Home;
