import Axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

interface ReadData {
  BOARD_TITLE: string;
  BOARD_CONTENT: string;
  REGISTER_ID: string;
}

const Read: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<ReadData | null>(null);

  useEffect(() => {
    Axios.get(`http://localhost:8000/notice/getpost/${id}`)
      .then((res) => {
        const { data } = res;
        setPost(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id]);

  const style1: React.CSSProperties = {
    marginBottom: "20px",
  };

  //게시물 삭제
  const handleDelete = () => {
    Axios.post("http://localhost:8000/notice/delete", {
      boardIdList: id
    })
      .then(() => {
        alert("삭제가 완료되었습니다.");
        
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", marginTop: "30px" }}>선택한 게시물</h3>
      {post && (
        <div
          className="container"
          style={{
            margin: "30px auto",
            backgroundColor: "#f7f7f7",
            padding: "50px 10px",
            borderRadius: "10px",
          }}
        >
          <Form>
            {/* 제목 출력 폼 */}
            <Form.Group style={style1}>
              <Form.Label style={{ float: "left", paddingLeft: "10px" }}>
                제목
              </Form.Label>
              <Form.Control type="text" value={post.BOARD_TITLE} readOnly />
            </Form.Group>
            {/* 내용 출력 폼 */}
            <Form.Group style={style1}>
              <Form.Label style={{ float: "left", paddingLeft: "10px" }}>
                내용
              </Form.Label>
              <Form.Control as="textarea" value={post.BOARD_CONTENT} readOnly />
            </Form.Group>
            {/* 작성자 출력 폼 */}
            <Form.Group style={style1}>
              <Form.Label style={{ float: "left", paddingLeft: "10px" }}>
                작성자
              </Form.Label>
              <Form.Control type="text" value={post.REGISTER_ID} readOnly />
            </Form.Group>
          </Form>
          <div style={{ float: "right" }}>
            <Link to={`/notice/modify/${id}`}>
              <Button style={{ marginLeft: "10px" }} variant="success">
                수정하기
              </Button>
            </Link>
            <Link to="/notice/list">
              <Button style={{ marginLeft: "10px" }} variant="danger" onClick={handleDelete}>
                삭제하기
              </Button>
            </Link>
            <Link to="/notice/list">
              <Button style={{ marginLeft: "10px" }} variant="secondary">
                리스트로
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Read;
