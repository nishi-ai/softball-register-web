import React, {Component} from 'react'
import styled, { keyframes } from "styled-components";
import { fadeIn } from 'react-animations'

const fadeInAnimation = keyframes`${fadeIn}`;

const TitleDiv = styled.div`
    position: relative;
    margin-top: 200 !important;
`;

const TitleImage = styled.div`
    // position: relative;
    margin-top: 200;
    padding: 2rem;
    margin: 10rem auto;
    max-width: 95%;
    marging-buttom: 2;
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
    return (
        <TitleDiv>
          <TitleImage>
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