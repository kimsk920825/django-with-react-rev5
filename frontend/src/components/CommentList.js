import React, { useState } from "react";
import { Input, Button } from "antd";
import { axiosInstance, useAxios } from "api";
import Comment from "./Comment";
import { useAppContext } from "store";

export default function CommentList({ post }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [commentContent, setCommentContent] = useState("");

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: commentList, loading, error }, refetch] = useAxios({
    url: `/api/posts/${post.id}/comments`,
    headers,
  });

  const handleCommentSave = async () => {
    const apiUrl = `/api/posts/${post.id}/comments/`;
    console.group("handleCommentSave");
    try {
      const response = await axiosInstance.post(
        apiUrl,
        { message: commentContent },
        { headers }
      );
      console.log(response);
      setCommentContent("");
      refetch();
    } catch (error) {
      console.log(error);
    }

    console.log(commentContent);
    console.groupEnd();
  };

  return (
    <div>
      {commentList &&
        commentList.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}

      <Input.TextArea
        style={{ marginBottom: ".5em" }}
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <Button
        block
        type="primary"
        disabled={commentContent.length === 0}
        onClick={handleCommentSave}
      >
        댓글 쓰기
      </Button>
    </div>
  );
}
