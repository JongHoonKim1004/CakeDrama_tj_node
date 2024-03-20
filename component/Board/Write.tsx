import Axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

interface InitState {
  title: string;
  content: string;
  registerId: string;
}

const Write: React.FC = () => {
  const [titleState, setTitleState] = useState("");
  const [contentState, setContentState] = useState("");
  const [registerIdState, setRegisterIdState] = useState("");
  const [writeState, setWriteState] = useState<InitState>({
    title: "",
    content: "",
    registerId: "",
  });

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleState(e.target.value);
    setWriteState({
      title: e.target.value,
      content: writeState.content,
      registerId: writeState.registerId,
    });
  };

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContentState(e.target.value);
    setWriteState({
      title: writeState.title,
      content: e.target.value,
      registerId: writeState.registerId,
    });
  };

  const handleRegisterId = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterIdState(e.target.value);
    setWriteState({
      title: writeState.title,
      content: writeState.content,
      registerId: e.target.value,
    });
  };

  const handleWrite = () => {
    if (
      writeState.title.trim() === "" ||
      writeState.content.trim() === "" ||
      writeState.registerId.trim() === ""
    ) {
      alert("제목, 내용, 작성자를 모두 입력해주세요");
      return;
    }

    setWriteState({
      title: titleState,
      content: contentState,
      registerId: registerIdState,
    });

    Axios.post("http://localhost:8000/notice/insert", {
      title: writeState.title,
      content: writeState.content,
      registerId: writeState.registerId,
    })
      .then((res) => {
        setWriteState({
          title: "",
          content: "",
          registerId: "",
        });
        window.location.href = "/CakeDrama_tj/notice/list";
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const style1: React.CSSProperties = {
    marginBottom: "30px",
  };

  return (
    <div>
      <div className="container">
        <h3 style={{ textAlign: "center", margin: "30px 0" }}>게시판 글쓰기</h3>
        <div className="formClass" style={{paddingBottom: "80px"}}>
          <Form style={{padding: "20px"}}>
            {/* 제목 입력 폼 */}
            <Form.Group style={style1}>
              <Form.Label style={{float: "left", paddingLeft: "10px"}}>제목</Form.Label>
              <Form.Control
                name="title"
                type="text"
                value={titleState}
                onChange={handleTitle}
                placeholder="제목을 입력하세요"
              />
            </Form.Group>
            {/* 내용 입력 폼 */}
            <Form.Group style={style1}>
              <Form.Label style={{float: "left", paddingLeft: "10px"}}>내용</Form.Label>
              <Form.Control
                name="content"
                as="textarea"
                value={contentState}
                onChange={handleContent}
                placeholder="내용을 입력하세요"
              />
            </Form.Group>
            {/* 작성자 입력 폼 */}
            <Form.Group style={style1}>
              <Form.Label style={{float: "left", paddingLeft: "10px"}}>작성자</Form.Label>
              <Form.Control
                name="registerId"
                type="text"
                value={registerIdState}
                onChange={handleRegisterId}
                placeholder="작성자명을 입력하세요"
              />
            </Form.Group>
          </Form>
          <div className="btnDiv" style={{ float: "right", marginTop: "30px" }}>
            <Button
              variant="primary"
              style={{ fontSize: "14px", marginRight: "10px"}}
              onClick={handleWrite}
            >
              등록하기
            </Button>
            <Link to={'/notice/list'}>
              <Button variant="secondary" style={{ fontSize: "14px" }}>
                리스트로
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
