import { Button } from 'antd';
import React, { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
const SaveButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} className="saveBtn">
      <CheckOutlined
        style={{
          verticalAlign: 'middle',
        }}
      />
      저장
    </Button>
  );
};

export default SaveButton;
