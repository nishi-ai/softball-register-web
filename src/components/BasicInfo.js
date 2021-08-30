import { React } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Carousel } from 'react-bootstrap'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

function DisplayBasicInfo (props) {
    const name = props.data.teamName;
    const discription = props.data.discription;
    const registerationExplanation = props.data.registeration;
    const location = props.data.location;

    const eachImage = props.data.images.map(image => {
        return 'images/'+image;
    });
    
  
    return (
        <section id="BasicInfos">
            <div className="row banner">
                <div className="banner-text">
                    <h2 className="mb-5">{name}</h2>
                    <h4 className="mb-3"><FontAwesomeIcon icon={faLocationArrow} size='xs'/> {location}</h4>
                    <p className="">{discription}</p>
                </div>
                <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={eachImage[0]}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={eachImage[1]}
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={eachImage[2]}
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={eachImage[3]}
                    alt="Third slide"
                    />
                </Carousel.Item>
                </Carousel>
            </div>
        </section>
    );
  }

export default DisplayBasicInfo;