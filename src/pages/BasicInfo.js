import { React } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";

function DisplayBasicInfo (props) {
    const discription = props.data.discription;
    const sport = props.data.sportName;
    const registerationExplanation = props.data.registeration;
    const location = props.data.location;

    const Location = styled.h3`
        font-family: Monaco;
        margin-bottom: 100px;
        text-align: center;
    `;

    const Sport = styled.h2`
        font-family: monospace;
        font-weight: bold;
        text-align: left;
        font-size: 40px;
        letter-spacing: .3em;
    `;

    const Discription = styled.h4`
        font-family: Lato;
        text-align: left;
        font-weight: bold;
        font-size: 30px !important;
    `;
    
    return (
        <section id="BasicInfos">
            {/* <div className="row banner"> */}
                <div className="banner-text">
                    <Location><FontAwesomeIcon icon={faLocationArrow} size='xs'/> {location}</Location>
                    <Sport>{sport}</Sport>
                    <Discription>{discription}</Discription>
                </div>
            <Discription>{registerationExplanation}</Discription>
            {/* </div> */}
        </section>
    );
  }

export default DisplayBasicInfo;