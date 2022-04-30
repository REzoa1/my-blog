import "./Account.css";
import React, { useCallback, useState } from "react";
import { InputNumber, Slider, Button, Row, Col } from "antd";
import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Input from "antd/lib/input/Input";
import { uploadImage } from "./../../utils/helpers";
import { Preloader } from "../Posts/Preloader/Preloader";

export const Account = ({ userState, setUserState }) => {
  const isAccount = true;
  const { avatar, userName, age } = userState;

  // console.log(avatar);
  const [isLoading, setIsLoading] = useState(false);
  const formHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("LoginValue", inputValue);
    localStorage.setItem("age", age);
    setUserState({ age: age, userName: inputValue });
    const file = e.target[0].files[0];
    uploadImage(file, userState, setUserState, setIsLoading, isAccount);
    // console.log(result);
    // localStorage.setItem("avatar", imageValue);
    // console.log(imageValue);
  };

  // constLoadImage = () = {

  // }

  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(
    localStorage.getItem("LoginValue")
  );
  const closeForm = useCallback(() => setIsEdit(false), [setIsEdit]);
  return (
  
      <div className="container">
          <Preloader isLoading={isLoading}>
        <div className="account__main">
          <div className="account__title">Аккаунт</div>

          <form className="account__form" onSubmit={formHandler}>
            <div className="account__item">
              <h1 className="account__subtitle">Аватарка:</h1>
              <input
                name="photo"
                type="file"
                className="account__input"
                accept=".png,.jpg,.jpeg"
              />
            </div>
            <div className="account__item">
              <h1 className="account__subtitle">Логин:</h1>
              {!isEdit ? (
                <Button
                  onClick={() => setIsEdit(true)}
                  className="account__field"
                  icon={<EditOutlined />}
                >
                  {inputValue}
                </Button>
              ) : (
                <div className="account__field">
                  <Input
                    required
                    value={inputValue}
                    className="account__field"
                    onChange={(e) => setInputValue(e.target.value)}
                    prefix={<CheckOutlined onClick={closeForm} />}
                    maxLength={8}
                  />
                </div>
              )}
            </div>

            <div className="account__item">
              <h1 className="account__subtitle">Возраст:</h1>
              <Row>
                <Col span={20}>
                  <Slider
                    min={1}
                    max={99}
                    value={age}
                    onChange={(e) => setUserState({ age: e })}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={1}
                    max={99}
                    style={{ margin: "0 16px" }}
                    value={age}
                    onChange={(e) => setUserState({ age: e })}
                  />
                </Col>
              </Row>
            </div>

            <div className="account__item">
              <Button type="primary" htmlType="submit">
                Сохранить изменения
              </Button>

              {/* {progress != 0 && <h2>Загрузка изменений {progress}%</h2>} */}
            </div>
          </form>
        </div>
        </Preloader>
      </div>
  );
};
