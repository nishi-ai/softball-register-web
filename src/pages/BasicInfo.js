import { React } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";

const Location = styled.h3`
font-family: Monaco;
margin-bottom: 100px;
text-align: center;
font-size: 24px;
`;

const Title = styled.h2`
font-family: monospace;
font-weight: bold;
text-align: left;
font-size: 25px;
letter-spacing: .1em;
`;

const Description = styled.p`
font-family: Lato;
text-align: left;
font-size: 25px !important;
white-space: pre-line;
`;

const Container = styled.div`
max-width: 700px;
margin: 20px;
`;

function DisplayBasicInfo (props) {
    const { description, title, location } = props.data;
    
    return (
        <Container>
            <Location>
                <FontAwesomeIcon icon={faLocationArrow} size='xs'/> {location}
            </Location>
            <Title>{title}</Title>
            <Description>{description}</Description>
        </Container>
    );
  }

export default DisplayBasicInfo;