import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  left: 15rem;
  top: 5.9rem;
  padding: 2rem;

  background-color: white;
  box-shadow: 10px 0px 5px 0px rgba(0, 0, 0, 0.106);
  border-radius: 0 0 10px 0;

  overflow-y: auto;
  max-height: calc(100vh - 5.9rem - 2 * 2rem);

  .icon {
    position: relative;
    bottom: 2.5rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 1023px) {
    left: 0;
    top: 5.8rem;
    bottom: 3.4rem;
  }

  @media screen and (max-width: 767px) {
    left: auto;
    top: auto;

    height: ${(props) => (props.display ? "240px" : "20px")};
    transition: height 0.2s ease-in-out;
    width: 100%;

    box-sizing: border-box;
    border-radius: 10px 10px 0 0;
    box-shadow: 0px -10px 10px 0px rgba(0, 0, 0, 0.106);
  }
`;
