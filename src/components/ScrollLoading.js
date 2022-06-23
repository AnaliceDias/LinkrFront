import styled from "styled-components";

import Eclipse from "../assets/gifs/Eclipse.gif";

export default function ScrollLoading({ pageLoad }) {
  return (
    <Loading key="loading" className="loader">
      <img src={Eclipse} alt="loading"></img>
      <p>{pageLoad ? "Loading posts..." : "Loading more posts..."}</p>
    </Loading>
  );
}

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 22px;
  color: #6d6d6d;
  margin: 20px 0;

  img {
    width: 100px;
  }
`;
