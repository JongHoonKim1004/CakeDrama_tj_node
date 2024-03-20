import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {Button, Table} from "react-bootstrap";
import { Link } from "react-router-dom";

interface BoardItem {
  BOARD_ID: number;
  BOARD_TITLE: string;
  BOARD_CONTENT: string;
  REGISTER_ID: string;
  REGISTER_DATE: string;
}

const Board: React.FC<{
  id: number;
  title: string;
  registerId: string;
  registerDate: string;
}> = ({ id, title, registerId, registerDate }) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td style={{textAlign: "left"}}>
        <Link
          to={`/notice/read/${id}`}
          style={{
            textDecoration: "none",
            color: "black",
            display: "block",
            fontWeight: "normal"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.fontWeight = "bold";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.fontWeight = "normal";
          }}
        >
          {title}
        </Link>
      </td>
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};

const BoardList: React.FC = () => {
  const [boardList, setBoardList] = useState<BoardItem[]>([]);
  const getList = useCallback(() => {
    Axios.get<BoardItem[]>("http://localhost:8000/notice/list", {})
      .then((res) => {
        const { data } = res;
        setBoardList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    getList();
  },[getList]);
    

  return (
    <>
      <div className="container" style={{padding: "50px 0"}}>
        
        <Table striped hover style={{marginTop : "30px", border: "1px solid #d8d8d8"}}>
          <thead>
            <tr>
              <th className="col-md-1">No</th>
              <th>제목</th>
              <th className="col-md-2">작성자</th>
              <th className="col-md-2">작성일자</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((ele) => (
              <Board 
                id = {ele.BOARD_ID}
                title = {ele.BOARD_TITLE}
                registerId = {ele.REGISTER_ID}
                registerDate = {ele.REGISTER_DATE}
                key = {ele.BOARD_ID}
              />
            ))}
          </tbody>
        </Table>
        <div style={{float: "right"}}>
          <Link to="/notice/write">
            <Button style={{marginBottom: "20px"}}>글쓰기</Button>
          </Link>{" "}
        </div>
      </div>
    </>
  );
};

export default BoardList;
