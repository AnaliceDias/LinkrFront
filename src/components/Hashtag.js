import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Hashtag(props){
    const hashtag = props.hashtag;
    const postId = props.postId;

    const navigate = useNavigate();

    return (
        <Container onClick={() => navigate(`/hashtag/${hashtag}`)}>
            {hashtag}
        </Container>
    );
}

const Container = styled.span`
    font-weight: 700;
    cursor: pointer;
    
    span {
        background: pink;
    }
`