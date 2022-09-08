import React, { useState } from 'react';

import { Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Card, CardBody } from 'reactstrap';
import { postImg } from '../../api/AuthApi';
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState();
  const userInfo = useSelector(state => state.user.get('userInfo'));

  const handleImage = async e => {
    const file = e.target.files[0];
    const err = checkImage(file);

    if (err) {
      notification.warning({
        message: '사진 업로드 에러',
        description: err,
        duration: 1.0,
      });
      handleImageDelete();
      return;
    }
    if (file) {
      let preview = document.getElementById('preview');
      preview.src = URL.createObjectURL(file);
    }
    setImageUrl(file);
  };
  const checkImage = file => {
    let err = '';

    if (!file) {
      err = 'File does not exist.';
      return err;
    }
    if (file.size > 1024 * 1024) {
      err = 'The largest image size is 1mb.';
    }
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      err = 'Image format is incorrect.';
    }

    return err;
  };
  const handleImageDelete = () => {
    setImageUrl('');
    let preview = document.getElementById('preview');
    preview.src = '';
    let file = document.getElementById('file');
    file.src = '';
    file.url = '';
  };
  const onClickImgUploadBtn = () => {
    if (imageUrl === null || imageUrl === '') {
      notification.warning({
        message: '이미지 없음',
        description: '이미지를 업로드 해주세요.',
        duration: 1.0,
      });
      return;
    }

    const bodyFormData = new FormData();
    bodyFormData.append('file', imageUrl);
    bodyFormData.append('user_id', userInfo.userId);
    postImg(bodyFormData)
      .then(result => {
        notification.success({
          message: '프로필 업로드 성공',
          description: result.data + '프로필 사진을 성공적으로 업로드했습니다.',
          duration: 1.0,
        });
        navigate('/');
      })
      .catch(error => {
        notification.error({
          message: '프로필 업로드 실패',
          description: error,
          duration: 1.0,
        });
      });
  };

  return (
    <div>
      <Card>
        <CardBody>
          {userInfo && (
            <>
              <div>{userInfo.userId}의 프로필 사진을 업로드 해주세요.</div>
              <div
                className="show_media"
                style={{ display: imageUrl ? 'grid' : 'none' }}
              >
                <div id="file_media">
                  <img id="preview" src="" alt="imageURL" />
                  <div>
                    <Button onClick={handleImageDelete}>취소</Button>
                  </div>
                </div>
              </div>
              <div className="file_upload">
                <i className="fas fa-image text-danger"></i>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={handleImage}
                />
              </div>

              <Button onClick={onClickImgUploadBtn}>업로드</Button>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Profile;
