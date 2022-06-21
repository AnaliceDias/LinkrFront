import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";

export default function CommentCount({
  setOpenComments,
  openComments,
  commentCount
}) {
  return (
    <Wrapper>
      <AiOutlineComment
        className="comment-icon"
        onClick={() => setOpenComments(!openComments)}
      />
      <Count>{commentCount} comments</Count>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  margin-top: 13px;
  gap: 5px;
  .comment-icon {
    font-size: 21px;
    cursor: pointer;
  }
`;

const Count = styled.span`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
`;
