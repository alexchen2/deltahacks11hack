import {useState} from "react";
import "../vendor/css/home.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import notifIcon from "../vendor/img/icons/notifications.png";
import profileIcon from "../vendor/img/icons/profile-pic.png";
import sleepIllust from "../vendor/img/people-illust/sleep.png";

import sleepIcon from "../vendor/img/icons/rest.png";
import workIcon from "../vendor/img/icons/work.png";
import dneIcon from "../vendor/img/icons/dne.png";
import socialIcon from "../vendor/img/icons/social.png";

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
};
  
const CarouselPanel = ({status, statusIcon, startTime, endTime, index}) => {
    return (
        <div className={`cpanel-bg cpanel-${index}`}>
            <div className="cpanel-top">
                <div className="cpanel-header">{status}</div>
                <div className={`cpanel-circle cpanel-${index}-accent`}>
                    <img className="cpanel-icon" src={statusIcon} alt="" />
                </div>
            </div>
            <div className="cpanel-subtext">
                Set from {startTime} to {endTime}
            </div>
        </div>
    )
};

const Home = () => {
    return (
        <div className="home-page">
            <div id="home-bg-1" />
            <div id="home-bg-2" />

            {/* Profile display */}
            <div className="profile-row">
                {/* Profile left side */}
                <div className="profile-left">
                    <img className="profile-icon" src={profileIcon} alt="" />
                    
                    <div className="profile-text">
                        <div className="profile-text-1">Hi, John Doe.</div>
                        <div className="profile-text-2">Today is Tuesday, November 25.</div>
                    </div>
                </div>

                <div className="profile-notif">
                    <img src={notifIcon} alt="" />
                </div>
            </div>

            {/* Main Panels */}
            <div className="main-panel-wrapper">
                <div className="main-panel-1">
                    <div className="mp1-text">
                        <div className="mp1-header">
                            <div className="mp1-header-1">Current Status:</div>
                            <div className="mp1-header-2">Sleeping</div>
                        </div>
                        <div className="mp1-subtext">
                            <div className="mp1-subtext-1">Until 9:00 am EST</div>
                            <div className="mp1-subtext-2">Tap to change status</div>
                        </div>
                    </div>
                    <img className="mp1-illust" src={sleepIllust} alt="" />
                </div>
                <div className="main-panel-2">
                    <div className="mp2-subheader">Upcoming Status:</div>
                    <div className="mp2-wrapper">
                        <div className="mp2-header">DO NOT DISTURB!</div>
                        <div className="mp2-subtext">9:00 am EST</div>
                    </div>
                </div>
            </div>

            <div className="cycle-wrapper">
                <div className="cycle-header">
                    Today's Cycle at a Glance
                </div>
                <div className="cycle-dropdown">

                </div>
                <div className="cycle-carousel">
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        arrows={true} 
                        renderDotsOutside={true}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        <CarouselPanel status="Currently Away" statusIcon={workIcon} startTime="9:00 am" endTime="6:00 pm" index={1} />
                        <CarouselPanel status="Feeling Social" statusIcon={socialIcon} startTime="6:00 pm" endTime="10:00 pm" index={2} />
                        <CarouselPanel status="Do Not Disturb" statusIcon={dneIcon} startTime="10:00 pm" endTime="12:00 am" index={3} />
                        <CarouselPanel status="Sleeping" statusIcon={sleepIcon} startTime="12:00 am" endTime="9:00 am" index={4} />
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Home;