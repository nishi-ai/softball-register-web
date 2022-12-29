import React from 'react';
import styled from "styled-components";

const Images = (props) => {

    const TitleDiv = styled.div`
        position: relative;
        margin-top: 200 !important;
    `;

    const pictures = props.data.images.map(picture => {
        const projectImage = 'images/'+picture;
        console.log('----', projectImage)

        return <div key={picture.index} className="columns portfolio-item">
           <div className="item-wrap">
               <img alt={projectImage} src={projectImage} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                 <h5>{picture.title}</h5>
                     <p>{picture.category}</p>
                  </div>
                </div>
          </div>
        </div>
      })
    
    return (
    //   <section id="portfolio">
        <div className="row">
            <div className="twelve columns collapsed">
                <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                    {pictures}
                </div>
            </div>
        </div>
    //   </section>
    );
  }

export default Images;