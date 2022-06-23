import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "../repository/API";



export default function Hashtag(props){
    const data = JSON.parse(localStorage.getItem("data"));
    const config = { headers: { Authorization: `Bearer ${data.token}` } };
    const hashtag = props.hashtag;
    const hashtagName = hashtag.replace("#","");
    const postId = props.postId;

    const navigate = useNavigate();

    async function openHashtag(){
        try{
            // const promise = await API.openHashtag(hashtagName , config);
            navigate(`../hashtag/${hashtagName}`);
        }catch(err){
            console.log(err);
            alert("Erro ao tentar carregar a página");
        }
        
    }

    return (
        <Container onClick={() => {
           openHashtag();
        }}>
           {hashtag}
        </Container>
    );
}

const Container = styled.span`
    font-weight: 700;
    cursor: pointer;
    :hover{
       color: #FFF;
    }
`