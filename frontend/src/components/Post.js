import React from "react";
import { Avatar, Card, Comment, Tooltip } from "antd";
import {
  HeartTwoTone,
  HeartOutlined,
  HeartFilled,
  UserOutlined,
} from "@ant-design/icons";
import CommentList from "./CommentList";

function Post({ post, handleLike }) {
  const { author, caption, location, photo, tag_set, is_like } = post;
  const { username, name, avatar_url } = author;

  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        actions={[
          is_like ? (
            <HeartTwoTone
              twoToneColor="#eb2f86"
              onClick={() => handleLike({ post, isLike: false })}
            />
          ) : (
            <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
          ),
        ]}
      >
        {/* <img src={`http://localhost:8000` + avatar_url} /> */}
        <Card.Meta
          avatar={
            <Avatar
              icon={
                <img
                  src={`http://localhost:8000` + avatar_url}
                  alt={username}
                />
              }
            />
          }
          title={location}
          description={caption}
          style={{ marginBottom: "0.5em" }}
        />
        <CommentList post={post} />
      </Card>
      {/* <img src={photo} alt={caption} style={{ width: "100px" }} /> */}
      {/* {caption},{location} */}
    </div>
  );
}

export default Post;
