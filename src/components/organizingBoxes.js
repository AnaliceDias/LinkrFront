import styled from "styled-components";

const BoxPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;

  margin-top: 72px;

  width: 100%;
  height: 100%;
`;

const BoxPosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: rigth;
  align-items: top;
  width: auto;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: top;
  width: 80%;
  height: 100%;

  @media (min-width: 1101px) {
    width: 90%;
    max-width: 1000px;
  }

  @media (max-width: 1100px) {
    width: 100%;
    justify-content: center;
  }
`;

const organizingBoxes = {
  BoxPage,
  BoxPosts,
  Container
};

export default organizingBoxes;
