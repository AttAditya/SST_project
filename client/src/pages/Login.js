// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from "antd";
import { Link , useNavigate } from "react-router-dom";

import {message} from 'antd'
import { LoginUser } from '../api/users';


function Login() {
  let navigate = useNavigate();
  let [submitting, setSubmitting] = useState(false);
  
  const onFinish = async (values)=>{
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      let response = await LoginUser(values);
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("auth_token", response.data.token);

        setTimeout(() => {
          navigate("/");
          setSubmitting(false);
        }, 1000);
        
        return;
      } else {
        message.error(response.data.message);
        setSubmitting(false);
        return;
      }
    } catch (err) {
      message.error(`User login failed`);
      setSubmitting(false);
      return;
    }
  }

 
  return (
    <>
    <header className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section className="left-section">
          <h1>Login to BookMyShow</h1>
        </section>

        <section className="right-section">
          <Form layout="vertical" onFinish={onFinish}>
    
          <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input
                id="email"
                type="text"
                placeholder="Enter your Email"
              ></Input>
            </Form.Item>

            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
                
              ></Input>
            </Form.Item>

            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
                loading={submitting}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              New User? <Link to="/register">Register Here</Link>
            </p>
          </div>
        </section>
      </main>
    </header>
  </>
  )
}

export default Login