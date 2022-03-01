import React, { useEffect, useState } from "react";
import { axiosInstance } from "api";
import { Form, Input, Button, notification } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { renderIntoDocument } from "react-dom/test-utils";

export default function Signup() {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});
  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      setFieldErrors({});
      const data = { username, password };
      try {
        await axiosInstance.post("/accounts/signup/", data);

        notification.open({
          message: "회원가입이 완료되었습니다.",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });

        history.push("/accounts/login");
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "회원가입이 실패했습니다.",
            description: "아이디 암호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
          const { data: fieldsErrorMessages } = error.response;
          // fieldsErrorMessages => {username:["m1", "m2"], password:[]}
          //python: mydict.items()
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                //errors:["m1","m2"].join(" ")=> "m1" "m2"
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors.join(" "),
                };
                errors.join(" ");
                return acc;
              },
              {}
            )
          );
        }
      }
    }
    fn();
  };
  return (
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
  );
}
