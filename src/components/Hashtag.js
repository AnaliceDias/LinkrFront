import styled from "styled-components";
import API from "../repository/API";

export default function Hashtag(props){
    const hashtag = props.hashtag;
    const postId = props.postId;

    console.log(hashtag);

    return (
        <Container onClick={() => API.abrirHashtag(hashtag)}>
            #{hashtag}
        </Container>
    );
}

const Container = styled.span`
    font-weight: bold;
    cursor: pointer;

    span {
        background: pink;
    }
`