import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";

import SearchInput from "./searchInput";

import API from "../../repository/API";

export default function Header() {
  const [text, setText] = useState("");
  const [info, setInfo] = useState({}); 
  
  const data = JSON.parse(localStorage.getItem("data"));
  const avatar = data.image; 

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  function redirect(id){      
    navigate(`/users/${id}`);
  }

  useEffect(() => {
    if (text.length >= 3) {
      

      const promise = API.getUser(text);

      promise.then(response => {
        setInfo(response.data);
      });
    } else if (text.length < 3) {
      setInfo({});
    }
  }, [text]);
 

  return (
    <Main>
      <Headers>
        <h1 onClick={() => navigate("/timeline")}>linkr</h1>
        <Input>
          <SearchInput values={text} onChange={search => setText(search)} />
          <AiOutlineSearch className="search" />
          {info.length > 0 ? (
            <BoxUser>
              {info.map(item => {
                const { name, picture, id} = item;
                
                return (
                  <div key={id} onClick={() => redirect(id)}>
                    <img src={picture} alt="user-avatar" />
                    <p>{name}</p>
                  </div>
                );
              })}
            </BoxUser>
          ) : (
            <></>
          )}
        </Input>
        <nav className="dp-menu">
          <ul>
            <li>
              <IoIosArrowDown className="arrow" />
              <ul>
                <li>
                  <p onClick={logout}>Logout</p>
                </li>
              </ul>
            </li>
            <img src={avatar} alt="user-avatar" />
          </ul>
        </nav>
      </Headers>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
`;
const Headers = styled.header`
  position: relative;
  width: 100vw;
  height: 72px;
  background: #151515;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    width: 99px;
    height: 50px;
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 45px;
    line-height: 50px;
    letter-spacing: 0.05em;
    color: #ffffff;
    margin-left: 20px;
    cursor: pointer;
  }

  img {
    width: 53px;
    height: 53px;
    border-radius: 50px;
    background-color: white;
  }

  .arrow {
    width: 45px;
    height: 45px;
    color: white;
    transition: all 0.3s;
    cursor: pointer;
  }

  .arrow:hover {
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
    width: 100%;
    text-decoration: none;
    display: inline-block;
    padding: 10px;
    transition: background 0.3s;
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
    width: 150px;
  }

  .dp-menu ul ul li p {
    display: block;
    color: white;
    background-color: #151515;
    width: 78%;
    height: 47px;
    border-bottom-left-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    text-align: center;
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }
`;
const Input = styled.div`
    position: absolute;
    top: 14px;
    left: calc((100vw - 563px)/2);

  .search {
    color: #c6c6c6;
    width: 21px;
    height: 21px;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  input {
    width: 563px;
    height: 45px;

    border: none;
    background: #ffffff;
    border-radius: 8px;

    padding-left: 20px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
  }

  input::placeholder {
    color: #c6c6c6;
  }  

  @media (max-width: 1000px) { 
    left: calc((100vw - 400px)/2);
    input {
      width: 400px;
    }
  }


  @media (max-width: 640px) {
    top: 80px;
    left: 2.5vw;
    input {
      width: 95vw;
      height: 45px;
    }
  }
  
  
`;
const BoxUser = styled.div`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background: #e6e6e6;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
  }

  p {
    margin-left: 10px;
    margin-top: 5px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #515151;
  }

  img {
    width: 39px;
    height: 39px;
    margin-left: 20px;
    margin-bottom: 10px;
    margin-top: 20px;
  }
`;
