import React from "react";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";
import useAxios from "axios-hooks";

//처음 PostList 컴포넌트가 만들어질 떄 API를 호출하고 싶다.
//apiUrl을 axios로 호출
//promise객체를 반환

function PostList() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data: postList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/api/posts/",
    headers,
  });

  return (
    <div>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다." />
      )}
      {postList &&
        postList.map((post, index) => {
          return <Post post={post} key={index} />;
        })}
    </div>
  );
}
export default PostList;
