import { IoIosArrowDown } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import API from "../repository/API"
import styled from "styled-components"
import tokenContext from "../contexts/TokenContext"

import authComponents from "./authStyle"
const { Right, Left, AllPosts, OnePost } = authComponents

export default function Timeline() {
    const data = localStorage.getItem("image")
    const { token } = useContext(tokenContext)

    const [posts, setPosts] = useState(null)
    const navigate = useNavigate()

    function logout() {
        localStorage.clear()
        navigate("/")
    }

    useEffect(() => {
        const promise = API.getPosts();
        promise.then(answer => {
            setPosts(answer.data)
        }).catch(err => {
            console.error(err)
            alert("An error occured while trying to fetch the posts, please refresh the page")
        })
    }, [])

    function TimelinePosts() {
        if (posts === null) {
            return (
                <h4>Loading...</h4>
            )
        } else {
            if (posts.length === 0) {
                return (
                    <h4>There are no posts yet</h4>
                )
            } else {
                posts.map(element => {
                    return (
                        <PutOnePost propName={element.name} propComent={element.coment} propLink={element.link} linkImage={element.image} />
                    )
                })
            }
        }
    }

    function PutOnePost({ propName, propComent, propLink, linkImage,linkTitle, linkDescription }) {
        return (
            <OnePost>
                <Left>
                    <img src={data} alt="profile" />
                </Left>
                <Right>
                    <div className="name">
                        <h1>{propName}</h1>
                    </div>
                    <div className="coment">
                        <h2>{propComent}</h2>
                    </div>
                    <div className="link" onClick={() => {
                        window.location.href = "https//google.com"
                    }}>
                        <h2>{linkTitle}</h2>
                        <h3>{linkDescription}</h3>
                        <p>{propLink}</p>
                        <img src={linkImage} alt="link image" />
                    </div>
                </Right>
            </OnePost>
        )
    }

    return (
        <Main>
            <Headers>
                <h1>linkr</h1>
                <nav class="dp-menu">
                    <ul>
                        <li><IoIosArrowDown />
                            <ul>
                                <li><p onClick={logout}>Logout</p></li>
                            </ul>
                        </li>
                        <img src={data} />
                    </ul>
                </nav>
            </Headers>
            <AllPosts>
                <TimelinePosts />
            </AllPosts>
        </Main>
    )
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
`
const Headers = styled.header`
    position: absolute;
    width: 100vw;
    height: 72px;   
    background: #151515;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: space-between;    
    
    h1{
        width: 99px;
        height: 50px;       
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 45px;
        line-height: 50px;  
        letter-spacing: 0.05em;
        color: #FFFFFF;
        margin-left: 20px;
    }

    img{
        width: 53px;
        height: 53px;               
        border-radius: 50px;
    }

    svg{
        width: 45px;
        height: 45px;
        color: white;
        transition: all .3s;
    }

    svg:hover{
        transform: rotate(0.5turn);
    }

    

    .dp-menu ul {
        margin-right: 20px;
        list-style-type: none;
        padding: 0;
    }   

    .dp-menu ul li {
        display: inline;
        position: relative;
        width: 120px;        
    }

    .dp-menu ul li p {
        
        text-decoration: none;
        display: inline-block;
        padding: 10px;
        transition: background .3s;
    }
    

    /*sub menu*/
    .dp-menu ul ul {
        display: none;
        left: 0;
        position: absolute;
    }

    .dp-menu ul li:hover ul {
        display: block;
    }

    .dp-menu ul ul {
        width: 150px
    }

    .dp-menu ul ul li p {
        display: block;
        color: white;
        background-color: #151515;
        width: 150px;
        height: 47px;           
        border-bottom-left-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        
        text-align: center;        
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }
`

