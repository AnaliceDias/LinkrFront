import styled from "styled-components";

const HashtagSidebarContainer = styled.div`
    margin: 68px 0 0 0;
    width: 301px;
    height: 406px;

    background-color: #171717;
    border-radius: 16px;

    position: fixed;
    right: 100px;

    @media (max-width: 1000px) {
        display: none;
        right: 0px;
    }

`

const Div = styled.div`
    display: block;
    width: 301px;
    height: 1px;
    background-color: #484848;

`
const Title = styled.div`
    margin-left: 16px;
    margin-top: 9px;
    margin-bottom: 12px;

    font-family: 'Oswald';
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;
`

const HashtagsContainer = styled.div`
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 22px;
`
const Hashtag = styled.div`
    margin-bottom: 10px;
    
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.05em;
    color: #FFFFFF;

    cursor: pointer;
`

const hashtagSidebarComponents = {
    HashtagSidebarContainer,
    Div,
    Title,
    HashtagsContainer,
    Hashtag
}

export default hashtagSidebarComponents;