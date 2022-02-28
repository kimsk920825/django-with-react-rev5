import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card, Form, Input, Button, notification } from "antd";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { renderIntoDocument } from "react-dom/test-utils";
import { useAppContext } from "store";
import { setToken } from "store";
import { parseErrorMessages } from "utils/forms";

export default function Login() {
  const { dispatch } = useAppContext();
  const location = useLocation();
  const history = useHistory();

  const [fieldErrors, setFieldErrors] = useState({});

  const { from: loginRedirectUrl } = location.state || {
    from: { pathname: "/" },
  };

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      setFieldErrors({});
      const data = { username, password };
      try {
        const response = await Axios.post(
          "http://localhost:8000/accounts/token/",
          data
        );
        const {
          data: { token: jwtToken },
        } = response;

        dispatch(setToken(jwtToken));

        notification.open({
          message: "로그인이 완료되었습니다.",
          //description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });

        history.push(loginRedirectUrl);
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "로그인이 실패했습니다.",
            description: "아이디 암호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
          const { data: fieldsErrorMessages } = error.response;
          // fieldsErrorMessages => {username:["m1", "m2"], password:[]}
          //python: mydict.items()

          setFieldErrors(parseErrorMessages(fieldsErrorMessages));
        }
      }
    }
    fn();
  };
  return (
    <Card title="로그인">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "아이디를 입력해주세요!" },
            { min: 5, message: "5글자 이상을 입력해주세요" },
          ]}
          hasFeedback
          {...fieldErrors.username}
          {...fieldErrors.non_field_errors}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
