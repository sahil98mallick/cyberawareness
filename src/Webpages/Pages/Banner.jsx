import React from 'react'

const Banner = () => {
    return (
        <>
            <section id='banner'>
                <div id='bannerpart'>
                    <div className="bannertext">
                        <h2 id='bannerheading'>Welcome to Cyber Awareness</h2>
                        <p className='bannertext'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores commodi architecto odio quod ea magni nobis autem iure similique impedit!</p>
                        <button className='btndesign'>More Details</button>
                    </div>
                    <div className="bannerimage">
                        <img src="https://www.kaspersky.com/content/en-global/images/repository/isc/2017-images/What-is-Cyber-Security.jpg" alt="BannerImage" style={{ width: "530px", height: "420px" }} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner