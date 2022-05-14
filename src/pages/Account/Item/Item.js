import { Col, InputNumber, Row, Slider } from "antd";
import React from "react";

export const Item = ({ value, onChange, isEdit }) => {
  return (
    <div className="account__item">
      <h1 className="account__subtitle">Возраст:</h1>
      <Row>
        <Col span={19}>
          <Slider
            min={1}
            max={99}
            disabled={!isEdit}
            marks={{
              1: "1",
              20: "20",
              40: "40",
              60: "60",
              80: "80",
              99: "99",
            }}
            value={value}
            onChange={onChange}
          />
        </Col>
        <Col span={2}>
          <InputNumber
            min={1}
            max={99}
            style={{ margin: "0 16px" }}
            disabled={!isEdit}
            value={value}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>
  );
};
