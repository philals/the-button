// src/pages/post/[id].tsx

import { useRouter } from "next/router";
import { DefaultQueryCell } from "../../utils/DefaultQueryCell";
import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";

const PostViewPage: NextPage = () => {
  const id = useRouter().query.id as string;
  const postQuery = trpc.useQuery(["post.byId", { id }]);

  return (
    <DefaultQueryCell
      query={postQuery}
      success={({ data }) => (
        <>
          <h1>{data.title}</h1>
          <em>Created {data.createdAt.toLocaleDateString()}</em>
          <p>{data.body}</p>
          <h2>
            Raw data: <pre>{JSON.stringify(data, null, 4)}</pre>
          </h2>
        </>
      )}
    />
  );
};

export default PostViewPage;
