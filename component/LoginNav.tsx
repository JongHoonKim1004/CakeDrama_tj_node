import { BreadcrumbItem, Nav } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate } from 'react-router-dom';


function LoginNav() {
  let navigate = useNavigate();
  return (
    <Breadcrumb style={{fontSize: "14px"}}>
      <BreadcrumbItem onClick={() => {navigate("/")}}  active style={{color: "white", cursor: "pointer"}}>홈</BreadcrumbItem>
      <Breadcrumb.Item onClick={() => {navigate("/login")}} active style={{color: "white", cursor: "pointer"}}>로그인</Breadcrumb.Item>
      <Breadcrumb.Item onClick={() => {navigate("/cart")}} active style={{color: "white", cursor: "pointer"}}>
        장바구니
      </Breadcrumb.Item>
      <Breadcrumb.Item onClick={() => {navigate("/cart")}} active style={{color: "white", cursor: "pointer"}}>FAQ</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default LoginNav;