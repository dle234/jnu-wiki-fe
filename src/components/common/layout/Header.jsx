import styled from "styled-components";
import mainLogo from "/main-logo.png";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/button/Button";
import routes from "@/routes";
import { SlLogout } from "react-icons/sl";
import SearchBar from "@/components/search/SearchBar";
import { getUserInfo } from "@/services/mypage";
import { useQuery } from "@tanstack/react-query";
import { logoutState } from "@/store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { popUpLogout } from "@/utils/alert";
import { removeCookie } from "../../../services/cookie";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLogin = useSelector((state) => state.user.isLogin);

  const { data: nickName } = useQuery(["member_info"], getUserInfo, {
    staleTime: Infinity,
    enabled: isLogin,
    select: (data) => data?.data?.response.nickName,
  });

  const logOutUser = () => {
    localStorage.clear();
    removeCookie("refresh-token");
    dispatch(logoutState());
    location.reload();
  };

  const clickLogout = () => {
    popUpLogout().then((result) => {
      if (result.isConfirmed) {
        logOutUser();
      }
    });
  };

  const reloadHome = () => {
    navigate(routes.home);
    location.reload();
  };

  return (
    <>
      <Container>
        <HeaderDiv>
          <LogoImg src={mainLogo} alt="jnu-logo" onClick={reloadHome} />
          <SearchBar />
          {!user.isLogin ? (
            <ButtonGroup>
              <Button
                color="primary"
                border="1px solid"
                border-color="primary"
                onClick={() => navigate(routes.join)}
              >
                회원가입
              </Button>
              <Button
                color="white"
                backgroundcolor="primary"
                onClick={() => navigate(routes.login)}
              >
                로그인
              </Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup>
              <NameInfo>
                <div>{nickName}</div>
                <button className="logout-btn" onClick={clickLogout}>
                  <SlLogout size={"21px"} />
                </button>
              </NameInfo>
            </ButtonGroup>
          )}
        </HeaderDiv>
        <Line />
      </Container>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100vw;
  background-color: white;
  z-index: 3;
  box-sizing: border-box;
`;

const HeaderDiv = styled.header`
  display: flex;
  align-items: center;

  margin: 0.25rem 3rem;
`;

const LogoImg = styled.img`
  width: 8rem;
  margin: 1rem 8rem 1rem 1rem;
  cursor: pointer;
`;

const Line = styled.hr`
  background-color: #216d32;
  height: 0.7px;
  margin: 0;
`;

const ButtonGroup = styled.div`
  position: fixed;
  right: 4rem;
`;

const NameInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .logout-btn {
    margin-left: 2rem;
  }
`;

export default Header;
