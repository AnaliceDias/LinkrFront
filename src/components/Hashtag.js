import styled from "styled-components";
import API from "../repository/API";

export default function Hashtag(props){
    const hashtag = props.hashtag;
    const postId = props.postId;

    console.log(hashtag);

    return (
        <Container onClick={() => API.abrirHashtag(hashtag)}>
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