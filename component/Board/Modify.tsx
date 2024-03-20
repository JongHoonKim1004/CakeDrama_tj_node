import Axios from "axios";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

interface ModifyData {
  BOARD_TITLE: string;
  BOARD_CONTENT: string;
  REGISTER_ID: string;
}

const Modify: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<ModifyData | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedRegisterId, setEditedRegisterId] = useState("");

  // 게시물 정보 불러오기
  useEffect(() => {
    Axios.get(`http://localhost:8000/notice/getPost/${id}`)
      .then((res) => {
        const { data } = res;
        setPost(data);
        setEditedTitle(data.BOARD_TITLE);
        setEditedContent(data.BOARD_CONTENT);
        setEditedRegisterId(data.REGISTER_ID);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id]);

  // 게시물 수정 정보 올리기
  const handleUpdate = () => {
    if (editedTitle.trim() === "" || editedContent.trim() === "") {
      alert("제목과 내용을 모두 입력하세요");
      return;
    }

    Axios.post("http://localhost:8000/notice/update", {
      id,
      title: editedTitle,
      content: editedContent,
      registerId: editedRegisterId,
    }).then(() => {
      alert("수정이 완료되었습니다.");
      Axios.get(`http://localhost:8000/notice/getPost/${id}`)
        .then((res) => {
          const { data } = res;
          setPost(data);
          setEditedTitle(data.BOARD_TITLE);
          setEditedContent(data.BOARD_CONTENT);
          setEditedRegisterId(data.REGISTER_ID);
          window.location.href = `/CakeDrama_tj/notice/read/${id}`;
        })
        .catch((e) => {
          console.error(e);
        });
    });
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

  const style1: React.CSSProperties = {
    marginBottom: "20px",
  };

  return (
    <div>
      <h3 style={{textAlign: "center", margin: "30px 0"}}>게시물 수정하기</h3>
      {post && (
        <div className="container">
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
                <Form.Control
                  type="text"
                  value={editedTitle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEditedTitle(e.target.value);
                  }}
                />
              </Form.Group>
              {/* 내용 출력 폼 */}
              <Form.Group style={style1}>
                <Form.Label style={{ float: "left", paddingLeft: "10px" }}>
                  내용
                </Form.Label>
                <Form.Control
                  as="textarea"
                  value={editedContent}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    setEditedContent(e.target.value);
                  }}
                />
              </Form.Group>
              {/* 작성자 출력 폼 */}
              <Form.Group style={style1}>
                <Form.Label style={{ float: "left", paddingLeft: "10px" }}>
                  작성자
                </Form.Label>
                <Form.Control type="text" value={editedRegisterId} readOnly />
              </Form.Group>
            </Form>
            <div style={{ float: "right" }}>
              <Button style={{ marginLeft: "10px" }} variant="success" onClick={handleUpdate}>
                수정완료
              </Button>
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
        </div>
      )}
    </div>
  );
};

export default Modify;
