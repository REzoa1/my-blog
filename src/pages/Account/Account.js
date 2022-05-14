import "./Account.css";
import React, { useCallback, useState } from "react";
import { Button } from "antd";
import { EditOutlined, CloseOutlined, InboxOutlined } from "@ant-design/icons";
import { uploadImage } from "./../../utils/helpers";
import { Preloader } from "../Posts/Preloader/Preloader";
import Dragger from "antd/lib/upload/Dragger";
import { editUserData } from "../../utils/helpers";
import NO_AVATAR from "./../../assets/img/avatar.png";
import { Item } from "./Item/Item";
import { Field } from "./Field/Field";

export const Account = ({ userState, setUserState }) => {
  const [isLoading, setIsLoading] = useState(userState.isLoading);

  const [userData, setUserData] = useState(userState.data);
  const { age, avatar, username, email } = userData;
  const localUserName = localStorage.getItem("localUserName");
  const [imageValue, setImageValue] = useState(avatar || NO_AVATAR);

  const [isEdit, setIsEdit] = useState(false);
  const handleUploadImage = (e) => {
    const file = e.fileList[0].originFileObj;
    uploadImage(file, setImageValue, setIsLoading);
  };

  const closeForm = useCallback(() => setIsEdit(!isEdit), [isEdit, setIsEdit]);
  const formHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("localUserName", username);
    const updatedUserData = {
      ...userData,
      username: username,
      age: age,
      avatar: imageValue,
      email: email,
    };
    editUserData(updatedUserData);
    setUserState({ data: updatedUserData });
    closeForm();
  };

  const handleEditAge = (e) => setUserData({ ...userData, age: e });
  const handleEditName = (e) => {
    setUserData({ ...userData, username: e.target.value });
  };
  const handleEditEmail = (e) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const handleDeleteImage = () => setImageValue(NO_AVATAR);

  const cancelChanges = () => {
    setUserData(userState.data);
    closeForm();
  };
  return (
    <div className="container">
      <Preloader isLoading={isLoading}>
        <form className="account__form" onSubmit={formHandler}>
          <div className="account__container">
            <img className="account__avatar" src={imageValue} alt="Avatar" />
            <h1 className="account__name">
              {isEdit ? username : localUserName}
            </h1>
            <div className="account__email">
              email: {email || "email@example.com"}
            </div>
            <Button
              shape="circle"
              type="primary"
              onClick={cancelChanges}
              icon={isEdit ? <CloseOutlined /> : <EditOutlined />}
              danger={isEdit}
            />
          </div>

          <div className="account__container">
            <div className="account__title">Аккаунт</div>
            <Field
              required
              isEdit={isEdit}
              title="Логин"
              fieldName={localUserName}
              onChange={handleEditName}
              value={username}
              maxLength={8}
            />
            <Field
              isEdit={isEdit}
              title="Email"
              fieldName={email || "Ваш e-mail"}
              onChange={handleEditEmail}
              value={email}
              type="email"
            />
            <Item value={age} onChange={handleEditAge} isEdit={isEdit} />

            <Button type="primary" htmlType="submit" disabled={!isEdit}>
              Сохранить изменения
            </Button>
          </div>

          <div className="account__container">
            <div className="account__item">
              <h1 className="account__subtitle">Аватарка:</h1>
              <Dragger
                beforeUpload={() => false}
                onChange={handleUploadImage}
                maxCount={1}
                disabled={!isEdit}
                accept=".png,.jpg,.jpeg"
              >
                <InboxOutlined />
                <div>Нажмите или переместите файл в эту область</div>
              </Dragger>
            </div>
            <Button disabled={!isEdit} onClick={handleDeleteImage} danger>
              Удалить аватар
            </Button>
          </div>
        </form>
      </Preloader>
    </div>
  );
};
