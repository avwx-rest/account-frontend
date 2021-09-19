<template>
    <section class="container-fluid bubble-full bubble-clear" id='main_section'>
        <div class="container">
            <h1 class="text-center h1 v-center">Aviation Weather REST API</h1>
            <div class="row">
                <div class="col s4">
                    <div class="card faq-card">
                        <div class="card-content white-text">
                            <span class="card-title text-center">METAR</span>
                        </div>
                        <div class="card-action faq-card-action">
                            <p class="white-text">Current surface conditions at an airport or other reporting location that updates every hour or earlier</p>
                        </div>
                    </div>
                </div>
                <div class="col s4">
                    <div class="card faq-card">
                        <div class="card-content white-text">
                            <span class="card-title text-center">TAF</span>
                        </div>
                        <div class="card-action faq-card-action">
                            <p class="white-text">Inflight 24-hour forecast for an area within 5nm of an airport or other reporting station that updates every six hours</p>
                        </div>
                    </div>
                </div>
                <div class="col s4">
                    <div class="card faq-card">
                        <div class="card-content white-text">
                            <span class="card-title text-center">PIREP</span>
                        </div>
                        <div class="card-action faq-card-action">
                            <p class="white-text">Inflight observations meant to aid controllers and pilots routing around adverse conditions and others of note</p>
                        </div>
                    </div>
                </div>
                <div class="col s4">
                    <div class="card faq-card">
                        <div class="card-content white-text">
                            <span class="card-title text-center">NBM</span>
                        </div>
                        <div class="card-action faq-card-action">
                            <p class="white-text">Atmospheric forecasts up to eight days in advance from NOAA's National Blend of Models</p>
                        </div>
                    </div>
                </div>
                <div class="col s4">
                    <div class="card faq-card">
                        <div class="card-content white-text">
                            <span class="card-title text-center">Station Info</span>
                        </div>
                        <div class="card-action faq-card-action">
                            <p class="white-text">Station data includes name, idents, coordinates, runways, and other useful fields</p>
                        </div>
                    </div>
                </div>
                <div class="col s4">
                    <div class="card faq-card">
                        <div class="card-content white-text">
                            <span class="card-title text-center">Search</span>
                        </div>
                        <div class="card-action faq-card-action">
                            <p class="white-text">Reports and stations can be returned from a text search, nearest a coordinate pair, or along a flight path</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </section>

  <section class="container-fluid bubble-grey">
      <div class="container text-center">
          <div class="row">
                <div class="col s12">
                    <div class="card faq-card">
                        <i class="material-icons white-text large">cloud</i><br>
                        <span class="card-title text-center white-text">Reliable Sources</span>
                        <div class="card-action faq-card-action">
                            <p class="white-text">Most reports are pulled from <a href="http://aviationweather.gov" target="_blank">NOAA ADDS</a>, the official source for aviation weather for pilots in the US with world-wide, but support exists for additional sources on a regional basis. Station information is compiled from <a href="http://ourairports.com" target="_blank">OurAirports</a></p>
                        </div>
                    </div>
                </div>
                <div class="col s12">
                    <div class="card faq-card">
                        <i class="material-icons white-text large">insert_chart</i><br>
                        <span class="card-title text-center white-text">Data Analysis</span>
                        <div class="card-action faq-card-action">
                            <p class="white-text">Reports are sanitized eliminating common errors with manual entry. Flight rules are calculated for each time period in the report. Additional features like value interpretation, translation, and text-to-speech are available per element and for the report as a whole</p>
                        </div>
                    </div>
                </div>
                <div class="col s12">
                    <div class="card faq-card">
                        <i class="material-icons white-text large">code</i><br>
                        <span class="card-title text-center white-text">Cross-Platform</span>
                        <div class="card-action faq-card-action">
                            <p class="white-text">Parsed reports are returned in JSON, XML, or YAML format, which can be imported into any language on any platform. Great for battery-conscientious mobile and IoT applications</p>
                        </div>
                    </div>
                </div>
          </div>
      </div>
  </section>
<hr>
  <section class="container">
      <div class="row text-center">
        <div class="col s6">
            <div class="card faq-card">
                <i class="material-icons white-text large">library_books</i><br>
                <span class="card-title text-center white-text">Documentation</span>
                <div class="card-action faq-card-action">
                    <p class="white-text">API docs are available on <a href="https://avwx.docs.apiary.io" target="_blank">Apiary</a>. Additional help can be found on the <a href="https://support.avwx.rest">support site</a></p>
                </div>
            </div>
        </div>
        <div class="col s6">
            <div class="card faq-card">
                <i class="material-icons white-text large">code</i><br>
                <span class="card-title text-center white-text">Open-Source</span>
                <div class="card-action faq-card-action">
                    <p class="white-text">All AVWX code and documentation is available on <a href="https://github.com/avwx-rest" target="_blank">GitHub</a> for security audits. Pull requests are welcome</p>
                </div>
            </div>
        </div>
      </div>
  </section>
    <hr>
  <section class="container-fluid bubble-grey" id="support">
      <div class="row text-center justify-content-center">
        <div class="col s4">
            <div class="card faq-card">
                <span class="card-title text-center white-text">About</span>
                <div class="card-action faq-card-action">
                    <p class="white-text">AVWX is a publicly-available REST API for aviation weather. The service organizes METAR, TAF, PIREP, and other report types into their individual elements and returns them in JSON, XML, or YAML format. It does a considerable amount of error correction so that your report is as clean and thorough as possible. It has additional services like providing station information, translating the report into English, and creating summary strings meant to be read or spoken. For more details, check out the <a href="https://avwx.docs.apiary.io">documentation</a></p>
                </div>
            </div>
        </div>
        <div class="col s4">
            <div class="card faq-card">
                <span class="card-title text-center white-text">Pricing</span>
                <div class="card-action faq-card-action">
                    <p class="white-text">AVWX offers three pricing tiers: <b>hobby</b>, <b>pro</b>, and <b>enterprise</b>. The basic METAR and TAF parsing services are free, but other features require monthly or yearly paid plans. Check out the <a href="https://account.avwx.rest">pricing guide</a> for more information.</p>
                    <p class="white-text">Additionally, the developer will gladly accept donations if a monthly plan is not an option. Thank you in advance!</p>
                    <a class="btn login-btn" href="https://donorbox.org/support-avwx">Support AVWX</a>
                </div>
            </div>
        </div>
        <div class="col s4">
            <div class="card faq-card">
                <span class="card-title text-center white-text">Contact</span>
                <div class="card-action faq-card-action">
                    <p class="white-text">Bugs? Comments? Feature Requests? Are you using the API and want your project to be featured? Email me at <a href="mailto:avwx@dupont.dev">avwx@dupont.dev</a>.</p>
                </div>
            </div>
        </div>
      </div>
  </section>
    <hr>
  <section class="container" id="contact">
    <div class="row text-center">    
        <div class="col s12">
            <div class="card faq-card">
                <span class="card-title text-center white-text">About Me</span>
                <div class="card-action faq-card-action">
                    <p class="white-text">Hi, I'm Michael. I'm a pilot, software developer, and tech meetup organizer based in Orlando, FL. You can find more of my projects at <a href="http://mdupont.com">mdupont.com</a>.</p>
                </div>
            </div>
        </div>
    </div>
  </section>
    <hr>
  <section class="container-fluid bubble-grey">
        <div class="row">
            <h2 class="white-text text-center">Who uses AVWX?</h2>
            <p class="white-text">The parser itself has been field-tested and in use since September 2014. It was originally made for a <a href="https://github.com/flyinactor91/METAR-RasPi">Raspberry Pi IoT project</a>, but was eventually made available as a public API. I've been contacted by flight schools, research institutions, and many mobile and desktop application developers. Here are a few of my favorite projects using AVWX.</p>
            <div class="col s3">
                <div class="card faq-card">
                    <div class="card-image">
                        <a href="https://aerolink.club/">
                            <img src="../assets/aerolink.png" class="card-img-top" alt="Aero Link logo with iOS screenshots">
                        </a>
                    </div>
                    <div class="card-action faq-card-action">
                    <span class="card-title text-center white-text">About Me</span>
                        <p class="white-text">Flight bag app for South America.</p>
                    </div>
                </div>
            </div>
            <div class="col s3">
                <div class="card faq-card">
                    <div class="card-image">
                        <a href="https://sndaviation.com/">
                            <img src="../assets/fleetcaptain.png" class="card-img-top" alt="Fleet Captain plane logo">
                        </a>
                    </div>
                    
                    <div class="card-action faq-card-action">
                        <span class="card-title text-center white-text">FleetCaptain</span>
                        <p class="white-text">Flight school fleet management</p>
                    </div>
                </div>
            </div>
            <div class="col s3">
                <div class="card faq-card">
                    <div class="card-image">
                        <a href="https://top.gg/bot/494888240617095168">
                            <img src="https://i.postimg.cc/RFSGH8FQ/logo.png" class="card-img-top" alt="AvBot logo of blue plane">
                        </a>
                    </div>
                    
                    <div class="card-action faq-card-action">
                        <span class="card-title text-center white-text">AvBot</span>
                        <p class="white-text">Discord bot for flight sims</p>
                    </div>
                </div>
            </div>
            <div class="col s3">
                <div class="card faq-card">
                    <div class="card-image">
                        <a href="https://unrealweather.blogspot.com">
                            <img src="../assets/unrealwx.png" class="card-img-top" alt="Screenshot of plane and weather from Microsoft Flight Simulator 2020">
                        </a>
                    </div>
                    
                    <div class="card-action faq-card-action">
                        <span class="card-title text-center white-text">AvBot</span>
                        <p class="white-text">Discord bot for flight sims</p>
                    </div>
                </div>
            </div>
        </div>
  </section>
</template>
<style scoped>
    #main_section {
        height: 100%;
        background: center no-repeat fixed url('../assets/airport-runway.jpg');
        background-size: cover;
        width: 143%;
        margin-left: -202px;
        margin-top: -41px;
    }
    .h1{
        color: #b22f2f !important;
        padding-top: 100px;
    }
    .card .card-content{
        padding: 10px !important;
    }
    .faq-card, .faq-card-action{
        background: transparent;
    }
    .icon-font{
        font-size: 60px
    }
    .card-action a{
        margin-right: 0px !important;
    }
</style>