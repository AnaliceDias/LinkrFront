import styled from "styled-components";

const AllPosts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  

  h4 {
    width: 100%
    font-size: 20px;
    color: white;
    font-family: "Lato";
    margin-top: 50px;
  }
`;

const TimelineHead = styled.div`
  width: 100%;
  margin-bottom: 40px;
  h1 {
    font-family: "Oswald", sans-serif;
    font-size: 33px;
    color: white;
    margin-left: 17px;
  }

  @media (min-width: 610px) {
    width: 611px;

    h1 {
      font-size: 43px;
      margin-left: 0;
    }
  }
`;

const UserHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  h1 {
    font-family: "Oswald", sans-serif;
    font-size: 33px;
    color: white;
    margin-left: 18px;
    width: 100%;
  }

  img {
    display: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 18px;
    object-fit: cover;
  }

  @media (min-width: 610px) {
    justify-content: space-evenly;
    img {
      display: block;
    }
    h1 {
      width: 500px;
      font-size: 43px;
    }
  }
`;

const NewPostButton = styled.button`
  width: 611px;
  height: 61px;
  margin-bottom: 50px;

  border: none;
  outline: none;
  border-radius: 16px;
  background-color: var(--button--theme);

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  color: #ffffff;
  font-size: 16px;

  .reload-icon {
    vertical-align: middle;
    font-size: 22px;
  }

  @media (max-width: 610px) {
    width: 100%;
  }
`;

const timelineComponents = {
  AllPosts,
  TimelineHead,
  UserHead,
  NewPostButton
};

export default timelineComponents;
