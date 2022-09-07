import { Button } from 'antd';
import React, { useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
const ExitButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} className="exitBtn">
      <CloseCircleOutlined
        style={{
          verticalAlign: 'middle',
        }}
      />
      닫기
    </Button>
  );
};

export default ExitButton;
