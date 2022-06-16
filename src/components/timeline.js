import { IoIosArrowDown } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import API from "../repository/API"
import styled from "styled-components"


export default function Timeline() {
    const data = localStorage.getItem("image")
    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    function logout() {
        localStorage.clear()
        navigate("/")
    }

    if (!token) { logout() } //if user is unautorized

    const [posts, setPosts] = useState(null);
    const promise = API.getPosts();

    useEffect(() => {
        promise.then(answer => {
            setPosts(answer.data)
        }).catch(err => {
            console.error(err)
        })
    }, [])

    function TimelinePosts() {
        if (posts === null) {
            return (
                <h1>Loading...</h1>
            )
        } else {
            if (posts.length === 0) {
                return (
                    <h1>There are no posts yet</h1>
                )
            } else {
                posts.map(element => {
                    return (<PutOnePost />)
                })
            }
        }
    }

    function PutOnePost() {
        return (
            <OnePost>
                <Left>
                    <image src={data} alt="profile" />
                </Left>
                <Right>
                    <div className="name">
                        <h1>Juvenal</h1>
                    </div>
                    <div className="coment">
                        <h2>Juvenal Juvenal Juvenal JuvenalJuvenalJuvenal</h2>
                    </div>
                    <div className="link" onClick={() => {
                        window.location.href = "https://google.com"
                    }}>
                        <h2>Site do Google</h2>
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
                <OnePost>
                    <Left>
                        <image src={data} alt="profile" />
                    </Left>
                    <Right>
                        <div className="name">
                            <h2>Juvenal</h2>
                        </div>
                        <div className="coment">
                            <h2>Juvenal Juvenal </h2>
                        </div>
                        <div className="link" onClick={() => {
                            window.location.href = "https://google.com"
                        }}>
                            <h2>Juvenal Juvenal Juvenal Juvenal Juvenal Juvenal</h2>
                        </div>
                    </Right>
                </OnePost>
            </AllPosts>
        </Main>
    )
}

const Main = styled.main`
    display: flex;
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
const OnePost = styled.div`
    display: flex;
    width: 611px;
    height: 276px;
    margin: 26px 0 0 16px;
    background-color : #171717;
`
const Left = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 50px;
   height: 242px;
   margin: 18px
`
const Right = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 242px;

    .name h1{
        font-family: 'Lato';
        font-size: 20px;
        color: white;
        text-align: left;
        margin: 8px 0 0 8px;
    }
    .coment h2{
        font-family: 'Lato';
        font-size: 17px;
        color: white;
        text-align: left;
        margin: 8px 0 0 8px;
        font-weight: 400;

    }
`
const AllPosts = styled.div`
    display: flex;
`