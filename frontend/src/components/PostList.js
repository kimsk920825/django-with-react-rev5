import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "./Post";
import { useAppContext } from "store";
const apiUrl = "http://127.0.0.1:8000/api/posts/";

//처음 PostList 컴포넌트가 만들어질 떄 API를 호출하고 싶다.
//apiUrl을 axios로 호출
//promise객체를 반환

function PostList() {
  const { store } = useAppContext();
  console.log(">>store", store);
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    Axios.get(apiUrl)
      .then((response) => {
        const { data } = response;
        console.log("loaded response :", response);
        setPostList(data);
      })
      .catch((error) => {});
  }, []);
  return (
    <div>
      {postList.map((post, index) => {
        return <Post post={post} key={index} />;
      })}
    </div>
  );
}
export default PostList;
