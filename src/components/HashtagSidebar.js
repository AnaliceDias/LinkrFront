import styled from "styled-components";
import Hashtag from "./Hashtag";

export default function HashtagSidebar(){
    return(
        <Container>
            <Hashtag  hashtag="nome_da_hashtag"/>
        </Container>
    )
}

const Container = styled.div`
    width: 100px
    heigth: 100px;
    background: yellow;
`
