import React from "react";
import Styles from "./About.css";
import Nav from '../../components/Nav';

const About = () => {
    return(
        <div className="container-fluid">
            <p>Hey. My name is Morgan, the brain behind Bags. Over the years as I worked as a grocery store checker, I asked countless people the same question: "Would you like to buy some bags today?" Most people bought them; what's a handful of dimes to them?Many had developed a habit of bringing in their own bags, or would just carry their groceries out in their arms. But then there were the many folks who would say "Oh no! I left my bags in the car. I can never remember to bring them in with me! I guess I'll buy some bags today." </p><br/>

            <h3><i>"Have I got the app for you..."</i></h3><br/>

            <p>I developed this application not just for those forgetful people, but to help the effort in reducing plastic waste and pollution our planet is facing. Saving the earth, saving dimes, one bag at a time.</p>
        </div>
    );
}

export default About;