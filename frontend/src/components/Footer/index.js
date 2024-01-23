import "./Footer.css"

function Footer() {


    return (
        <div className="footer">
            <div style={{width: "70%", marginLeft: "15%"}}>
                <div className="footer-p">
                <p className= "footer-ps">Technologies Used :</p>
                {/* <a className= "footer-ps" href="frontend/public/Resume.pdf" target="_blank">View my Resume</a> */}
                </div>

                <div class="row">
                    <div class="skill-div">
                        <div class="skill-icon">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" />
                        </div>
                        <div class="skill-name">
                            <h5>Javascript</h5>
                        </div>
                    </div>
                    <div class="skill-div">
                        <div class="skill-icon">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-plain.svg" />
                        </div>
                        <div class="skill-name">
                            <h5>Ruby</h5>
                        </div>
                    </div>
                    <div class="skill-div">
                        <div class="skill-icon">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
                        </div>
                        <div class="skill-name">
                            <h5>React</h5>
                        </div>
                    </div>
                    <div class="skill-div">
                        <div class="skill-icon">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />
                        </div>
                        <div class="skill-name">
                            <h5>Redux</h5>
                        </div>
                    </div>
                    <div class="skill-div">
                        <div class="skill-icon">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain-wordmark.svg" />
                        </div>
                        <div class="skill-name">
                            <h5>Rails</h5>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="skill-div">
                        <div class="skill-icon">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" />
                        </div>
                        <div class="skill-name">
                            <h5>CSS3</h5>
                        </div>
                    </div>
                    <div class="skill-div">
                        <div class="skill-icon">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" />
                        </div>
                        <div class="skill-name">
                            <h5>HTML5</h5>
                        </div>
                    </div>
                    <div class="skill-div">
                        <div class="skill-icon">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg" />
                        </div>
                        <div class="skill-name">
                            <h5>PostgreSQL</h5>
                        </div>
                    </div>
                    <div class="skill-div">
                        <div class="skill-icon">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" />
                        </div>
                        <div class="skill-name">
                            <h5>AWS</h5>
                        </div>
                    </div>
                    <div class="skill-div">
                        <div class="skill-icon">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" />
                        </div>
                        <div class="skill-name">
                            <h5>NPM</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer