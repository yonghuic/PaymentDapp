import React from "react";
import "./Home.css"

function Home () {
    return (
       <>
       <div className="logoimage"><img src={process.env.PUBLIC_URL + "/logo.png"} alt="pay"/></div>
       </> 
    )
}
export default Home 
