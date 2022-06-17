import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const avatar = localStorage.getItem("image");

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <Main>
      <Headers>
        <h1>linkr</h1>
        <nav className="dp-menu">
          <ul>
            <li>
              <IoIosArrowDown />
              <ul>
                <li>
                  <p onClick={logout}>Logout</p>
                </li>
              </ul>
            </li>
            <img src={avatar} alt="avatar" />
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
  position: absolute;
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
  }

  img {
    width: 53px;
    height: 53px;
    border-radius: 50px;
  }

  svg {
    width: 45px;
    height: 45px;
    color: white;
    transition: all 0.3s;
  }

  svg:hover {
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
    width: 150px;
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
