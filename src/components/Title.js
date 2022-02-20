import React from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes, css } from "styled-components";
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

const TitleDiv = styled.div`
    position: relative;
    margin-top: 200 !important;
`;

const TitleImage = styled.div`
    margin-top: 200;
    padding: 2rem;
    margin: 10rem auto;
    max-width: 95%;
    marging-buttom: 2;
    border-radius: 50%;
    &:hover {
      cursor: pointer;
      box-shadow: inset 0 0 35px 0px rgba(0, 0, 0, 0.15),
          inset 0 2px 1px 1px rgba(255, 255, 255, 0),
          1px 1px 15px 2px rgba(154, 137, 164, 0.1);
    }
`;

const TextOnImage = styled.div`
    position: absolute;
    width: max-content;
    right: 50%;
    left: -15%;
    bottom: 10%;
    margin: 5rem auto;
    text-align: center;
    animation: 2s ${fadeInAnimation};
    font-family: 'Italianno', cursive;
`;

const Title = (props) => {

  const history = useHistory();
  const routeChange = () => { 
    let path = `/`; 
    history.push(path);
  }

    return (
        <TitleDiv>
          <TitleImage onClick={routeChange}>
            <img
              src={props.data.titleImage}
              alt=""
            />
          </TitleImage>
          <TextOnImage>
            <h1 >{props.data.teamName}</h1>
            <h1>{props.data.sportName}</h1>
            <h3>{props.data.city}</h3>
          </TextOnImage>  
       </TitleDiv>   
    )
  };
  
  export default Title;