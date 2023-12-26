import React from 'react'

const Services = () => {
    const redirectToExternalLink = (link) => {
        window.location.href = link;
    };
    return (
        <>
            <section id='servicessection'>
                <div class="servicesrow">
                    <h2 class="section-heading">Our Services</h2>
                </div>
                <div class="row">
                    <div class="column">
                        <div class="servicescard">
                            <div class="servicesicon-wrapper">
                                <i class="bi bi-chat-dots"></i>
                            </div>
                            <h3 id='servicestitle'>OTP Frauds</h3>
                            <p id='servicestext'>
                                "Secure transactions, mitigate risks: Implement multi-factor authentication to manage and prevent OTP frauds effectively."
                            </p>
                            <button className='morebtn' onClick={() => redirectToExternalLink('https://en.wikipedia.org/wiki/SMS_banking')}>
                                More Details
                            </button>
                        </div>
                    </div>
                    <div class="column">
                        <div class="servicescard">
                            <div class="servicesicon-wrapper">
                                <i class="bi bi-cash-stack"></i>
                            </div>
                            <h3 id='servicestitle'>Tax Fraud</h3>
                            <p>
                                "Deceptive practices to evade taxes, including false reporting and illicit schemes, undermining revenue collection systems."
                            </p>
                            <button className='morebtn' onClick={() => redirectToExternalLink('https://en.wikipedia.org/wiki/Tax_evasion')}>
                                More Details
                            </button>
                        </div>
                    </div>
                    <div class="column">
                        <div class="servicescard">
                            <div class="servicesicon-wrapper">
                                <i class="bi bi-virus"></i>
                            </div>
                            <h3 id='servicestitle'>Ransomware Attacks</h3>
                            <p>
                                "Ransomware encrypts data, demands payment for decryption, posing a severe threat to businesses and individuals alike."
                            </p>
                            <button className='morebtn' onClick={() => redirectToExternalLink('https://en.wikipedia.org/wiki/Ransomware')}>
                                More Details
                            </button>
                        </div>
                    </div>
                    <div class="column">
                        <div class="servicescard">
                            <div class="servicesicon-wrapper">
                                <i class="bi bi-box2-heart-fill"></i>
                            </div>
                            <h3 id='servicestitle'>Insurance Fraud</h3>
                            <p>
                                "Insurance fraud: deceitful claims or actions to obtain undeserved financial benefits from insurance companies, impacting premiums."
                            </p>
                            <button className='morebtn' onClick={() => redirectToExternalLink('https://en.wikipedia.org/wiki/Insurance_fraud')}>
                                More Details
                            </button>
                        </div>
                    </div>
                    <div class="column">
                        <div class="servicescard">
                            <div class="servicesicon-wrapper">
                                <i class="bi bi-person-workspace"></i>
                            </div>
                            <h3 id='servicestitle'>Job Scams</h3>
                            <p>
                                "Beware job scams: Verify offers, avoid upfront payments, and research companies to prevent fraudulent employment schemes."
                            </p>
                            <button className='morebtn' onClick={() => redirectToExternalLink('https://en.wikipedia.org/wiki/Employment_fraud')}>
                                More Details
                            </button>
                        </div>
                    </div>
                    <div class="column">
                        <div class="servicescard">
                            <div class="servicesicon-wrapper">
                                <i class="bi bi-database-fill-lock"></i>
                            </div>
                            <h3 id='servicestitle'>Data Breach</h3>
                            <p>
                                "Data breach alert: Protect sensitive information, use encryption, and monitor for unauthorized access to safeguard privacy."
                            </p>
                            <button className='morebtn' onClick={() => redirectToExternalLink('https://en.wikipedia.org/wiki/Data_breach')}>
                                More Details
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Services