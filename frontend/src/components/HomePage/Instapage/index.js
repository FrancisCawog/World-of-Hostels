import React from "react";
import "./InstaPage.css"

import insta from "../../../assets/pictures/icons/new-instagram-logo-glyph.png"
import london from "../../../assets/Insta Pics/FRA01122.jpg"
import hanoi from "../../../assets/Insta Pics/FRA00675.jpg"
import kamodo from "../../../assets/Insta Pics/FRA01447.jpg"
import fuji from "../../../assets/Insta Pics/FRA01616-HDR.jpg"
import luxor from "../../../assets/Insta Pics/FRA06852.jpg"
import takayama from "../../../assets/Insta Pics/FRA06905.jpg"
import phiphi from "../../../assets/Insta Pics/FRA07450.jpg"
import singapore from "../../../assets/Insta Pics/FRA09993.jpg"

export default function InstaPage() {

    return (
        <div className="insta-pics">
        <h2>Get inspired!</h2>
        <h3>Discover popular places for unforgettable adventures.</h3>
        <div className="insta-pics-content">
          <div className="insta-column1">
            <a href="https://www.instagram.com/p/CqUt3ALyLmE/?img_index=2" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={london}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      London
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>

            <a href="https://www.instagram.com/p/CevdMe3vLDb/?img_index=1" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={hanoi}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Hanoi
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>
          </div>
          <div className="insta-column2" style={{marginTop: "5.5625rem"}}>
          <a href="https://www.instagram.com/p/Cr8wo6eSamf/?img_index=1" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={takayama}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Takayama
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>

            <a href="https://www.instagram.com/p/CksQM1GuY9L/?img_index=3" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={kamodo}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Kamodo Island
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>
          </div>
          <div className="insta-column3">
          <a href="https://www.instagram.com/p/CjpQNqWrzOj/?img_index=5" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={singapore}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Singapore
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>

            <a href="https://www.instagram.com/p/CiCk_yPL7jD/?img_index=6" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={phiphi}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Phi Phi Island
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>
          </div>
          <div className="insta-column4" style={{marginTop: "5.5625rem"}}>
          <a href="https://www.instagram.com/p/CtZeB_tOhMB/?img_index=1" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={fuji}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Mt. Fuji
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>

            <a href="https://www.instagram.com/p/Cn98VGyuOjQ/?img_index=2" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={luxor}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Luxor
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>
          </div>
        </div>
    </div>
    )
}