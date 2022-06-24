import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import API from "../repository/API";
import hashtagSidebarComponents from "../styles/hashtagStyle";

const {HashtagSidebarContainer , Div , Title , HashtagsContainer , Hashtag} = hashtagSidebarComponents;

export default function HashtagSidebar(){

    const data = JSON.parse(localStorage.getItem("data"));
    const config = { headers: { Authorization: `Bearer ${data.token}` } };
    const [hashtagsTrending , setHashtags] = useState([]);
    let hashtags = [];

    const navigate = useNavigate();

    async function getHashtagTrending(){
        try{
            const getHashtagsTrending = await API.getHashtagTrending();
            return getHashtagsTrending.data;
        }catch(err){
            console.log(err);
            return [];
        }   
    }

    async function openHashtag(hashtagName){
        try{
            //const promise = await API.openHashtag(hashtagName , config);
            navigate(`../hashtag/${hashtagName}`);
        }catch(err){
            console.log(err);
            alert("Erro ao tentar carregar a página");
        }  
    }

    useEffect(() => {
        const hashtagsList = getHashtagTrending();
        hashtagsList.then((r) => {
            hashtags = r.map((hashtag , index) => (
            <Hashtag onClick={() => openHashtag(hashtag.hashtagName)}>
                # {hashtag.hashtagName}
            </Hashtag>
            ))
            setHashtags(hashtags);
        })
    }, [])
    
    return(
        <HashtagSidebarContainer>
            <Title>Trending</Title>
            <Div />
            <HashtagsContainer >
                {hashtagsTrending}
            </HashtagsContainer>
        </HashtagSidebarContainer>
    )
};