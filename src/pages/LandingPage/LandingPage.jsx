import Logo from "../../components/Logo.jsx";
import {useContext} from "react";
import './LandingPage.css';
import {useClerk, useUser} from "@clerk/clerk-react";
import {useNavigate} from "react-router-dom";
import {AppContext, initialInvoiceData} from "../../context/AppContext.jsx";
import {assets} from "../../assets/assets.js";
import { Facebook, Linkedin, Instagram } from 'lucide-react';


const LandingPage = () => {

    return (
        <>
            {/* Hero Section: Full-width, centered text with background image */}
            <header id="hero" className="hero-section text-white text-center">
                <div className="container py-5 d-flex flex-column justify-content-center" style={{ minHeight: '85vh' }}>
                    <div className="row py-lg-5">
                        <div className="col-lg-9 col-md-10 mx-auto">
                            <h1 className="display-3 fw-bold mb-4">
                                Effortless Invoicing. Professional Results.
                            </h1>
                            <p className="lead mb-5" style={{ fontSize: '1.3rem' }}>
                                Stop wrestling with spreadsheets. Quick Invoice helps you create and send beautiful invoices in minutes, so you get paid faster.
                            </p>
                            <p>
                                {/* Primary call to action */}
                                <button className="btn btn-lg btn-warning fw-bold rounded-pill my-2 mx-1 px-5 py-3">
                                    Generate Your First Invoice
                                </button>
                                {/* Secondary call to action */}
                                <a href="#how-it-works" className="btn btn-lg btn-outline-light rounded-pill my-2 mx-1 px-5 py-3">
                                    Learn More
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* How It Works Section: Explains the process in steps using cards */}
            <section id="how-it-works" className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5 display-5 fw-bold">Get Started in 4 Simple Steps</h2>
                    <div className="row g-4 justify-content-center">
                        {/* Step 1 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-primary-soft">
                                    <img
                                        src="https://placehold.co/150x150/0D6EFD/FFFFFF?text=1&font=montserrat"
                                        className="rounded-circle"
                                        alt="Enter Invoice Details"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/E0E0E0/000000?text=Error'; }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">Enter Details</h5>
                                    <p className="card-text text-muted small">
                                        Quickly fill in your clients information, item descriptions, quantities, and prices. Our intuitive form makes it a breeze.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-success-soft">
                                    <img
                                        src="https://placehold.co/150x150/198754/FFFFFF?text=2&font=montserrat"
                                        className="rounded-circle"
                                        alt="Choose Template"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/E0E0E0/000000?text=Error'; }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">Choose Template</h5>
                                    <p className="card-text text-muted small">
                                        Browse our gallery of professionally designed templates. Pick one that matches your brand and style.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-warning-soft">
                                    <img
                                        src="https://placehold.co/150x150/FFC107/000000?text=3&font=montserrat"
                                        className="rounded-circle"
                                        alt="Preview Invoice"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/E0E0E0/000000?text=Error'; }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">Preview Invoice</h5>
                                    <p className="card-text text-muted small">
                                        See exactly how your invoice will look before sending it. Make any last-minute adjustments with ease.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-info-soft">
                                    <img
                                        src="https://placehold.co/150x150/0DCAF0/FFFFFF?text=4&font=montserrat"
                                        className="rounded-circle"
                                        alt="Download & Save"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/E0E0E0/000000?text=Error'; }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">Download & Save</h5>
                                    <p className="card-text text-muted small">
                                        Download your invoice as a PDF, send it directly via email, or save it for your records and future reference.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section: Highlights key benefits with images and text */}
            <section id="features" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 display-5 fw-bold">Why Choose Quick Invoice?</h2>
                    {/* Feature 1 */}
                    <div className="row align-items-center gy-4">
                        <div className="col-md-6">
                            <img
                                src={assets.landing1}
                                className="img-fluid rounded shadow-lg"
                                alt="Invoice Customization"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E0E0E0/000000?text=Error'; }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Easy to Fill Invoice Details</h3>
                            <p className="text-muted lead fs-6 mx-2">
                                Creating professional invoices has never been easier. Our intuitive interface guides you through every step, from client information to itemized billing. No accounting experience needed – just fill in the fields and let Invoice Gen handle the rest.
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="fw-bold mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Curated list of templates from gallery.</li>
                                <li className="fw-bold mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Add your logo and invoice details.</li>
                                <li className="fw-bold"><i className="bi bi-check-circle-fill text-primary me-2"></i>Tailor fields to your needs.</li>
                            </ul>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="row align-items-center gy-4 mt-5 flex-row-reverse">
                        <div className="col-md-6">
                            <img
                                src={assets.landing2}
                                className="img-fluid rounded shadow-lg"
                                alt="Time Saving"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E0E0E0/000000?text=Error'; }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Beautiful Dashboard</h3>
                            <p className="text-muted lead fs-6 mx-2">
                                Stay organized with our elegant dashboard that puts all your invoices at your fingertips. Track payments, manage clients, and access your complete invoicing history in one beautiful, easy-to-navigate interface. Everything you need, right where you need it.
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="fw-bold mx-2mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>View the previous invoices.</li>
                                <li className="fw-bold mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Your saved invoices with thumbnail.</li>
                                <li className="fw-bold mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Reuse one or more invoices.</li>
                                <li className="fw-bold"><i className="bi bi-check-circle-fill text-primary me-2"></i>Track the invoices.</li>
                            </ul>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="row align-items-center gy-4 mt-5">
                        <div className="col-md-6">
                            <img
                                src={assets.landing3}
                                className="img-fluid rounded shadow-lg"
                                alt="Invoice Customization"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E0E0E0/000000?text=Error'; }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Invoice Preview with Action Buttons</h3>
                            <p className="text-muted lead fs-6 mx-2">
                                See exactly what your clients will receive before you hit send. Our live preview feature lets you perfect every detail, switch between templates instantly, and make real-time adjustments. When it looks perfect, save, download, or send with just one click.
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="fw-bold mb-2"><i className="fw-boldbi bi-check-circle-fill text-primary me-2"></i>Live preview.</li>
                                <li className="fw-bold mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Switch between multiple invoices.</li>
                                <li className="fw-bold mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>One click to Save, Download and Delete invoices.</li>
                            </ul>
                        </div>
                    </div>
                    {/* Feature 4 */}
                    <div className="row align-items-center gy-4 mt-5 flex-row-reverse">
                        <div className="col-md-6">
                            <img
                                src={assets.landing4}
                                className="img-fluid rounded shadow-lg"
                                alt="Time Saving"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E0E0E0/000000?text=Error'; }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Send Invoices Instantly</h3>
                            <p className="text-muted lead fs-6 mx-2">
                                Get paid faster with instant invoice delivery. Send professional invoices directly to your clients' inbox without switching apps or downloading files. Our integrated email system ensures your invoices arrive promptly and professionally, every single time.
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="fw-bold mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Send invoices instantly without leaving the application.</li>
                                <li className="fw-bold mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>One click to send invoices.</li>
                                <li className="fw-bold mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Send unlimited invoices.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile App Download Section */}
            <section
            id="download-app"
            className="py-5"
            style={{ background: 'linear-gradient(135deg, #0d1117 0%, #1e3a5f 100%)' }}
            >
            <div className="container">
                <div className="row align-items-center gy-5">

                {/* Left */}
                <div className="col-lg-6 text-white">
                    <div className="mb-3">
                    <span
                        className="badge rounded-pill px-3 py-2"
                        style={{ background: '#0D6EFD', fontSize: '0.85rem' }}
                    >
                        📱 Now Available on Android
                    </span>
                    </div>

                    <h2 className="display-5 fw-bold mb-3">
                    Take QuickInvoice <br />
                    <span style={{ color: '#FFC107' }}>Everywhere You Go</span>
                    </h2>

                    <p
                    className="lead mb-4"
                    style={{ color: '#94a3b8', fontSize: '1.1rem' }}
                    >
                    Create, manage, and send professional invoices directly from your Android device.
                    Syncs instantly with your web app.
                    </p>

                    {/* Features */}
                    <div className="d-flex flex-wrap gap-2 mb-4">
                    {[
                        '✅ Free to Download',
                        '✅ Syncs with Web App',
                        '✅ Works Offline',
                        '✅ All Templates Included',
                    ].map((f, i) => (
                        <span
                        key={i}
                        className="badge rounded-pill px-3 py-2"
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            color: '#e2e8f0',
                            fontSize: '0.8rem',
                        }}
                        >
                        {f}
                        </span>
                    ))}
                    </div>

                    {/* Download Button */}
                    <a
                    href="/QuickInvoice-v1.0.apk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-warning btn-lg fw-bold rounded-pill px-5 py-3 me-3 mb-3"
                    >
                    <i className="bi bi-android2 me-2"></i>
                    Download APK
                    </a>

                    <p style={{ color: '#64748b', fontSize: '0.8rem' }}>
                    Android 8.0+ · ~15MB · Free
                    </p>

                    {/* Install Instructions */}
                    <div
                    className="mt-3 p-3 rounded"
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    >
                    <p
                        className="mb-1"
                        style={{
                        color: '#94a3b8',
                        fontSize: '0.82rem',
                        fontWeight: '600',
                        }}
                    >
                        📌 How to install:
                    </p>

                    <ol
                        className="mb-0 ps-3"
                        style={{
                        color: '#64748b',
                        fontSize: '0.8rem',
                        lineHeight: '1.8',
                        }}
                    >
                        <li>Download the APK file</li>
                        <li>Enable <strong style={{ color: '#94a3b8' }}>Unknown Sources</strong> in settings</li>
                        <li>Open the APK and tap <strong style={{ color: '#94a3b8' }}>Install</strong></li>
                        <li>Launch QuickInvoice and sign in</li>
                    </ol>
                    </div>
                </div>

                {/* Right (Clean Visual Area) */}
                <div className="col-lg-6 text-center">
                    <div
                    className="p-5 rounded-4"
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    >
                    <h4 style={{ color: '#FFC107', fontWeight: '700' }}>
                        QuickInvoice Mobile
                    </h4>

                    <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                        Fast. Simple. Reliable.
                    </p>

                    {/* Stats */}
                    <div className="d-flex justify-content-center gap-4 mt-4">
                        {[
                        { value: '5+', label: 'Templates' },
                        { value: '100%', label: 'Free' },
                        { value: 'v1.0', label: 'Version' },
                        ].map((stat, i) => (
                        <div key={i}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFC107' }}>
                            {stat.value}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {stat.label}
                            </div>
                        </div>
                        ))}
                    </div>

                    </div>
                </div>

                </div>
            </div>
            </section>

            {/* Call to Action Section: Final prompt for users to start */}
            <section id="generate-invoice" className="py-5 text-center bg-primary text-white">
                <div className="container">
                    <h2 className="display-5 fw-bold mb-3">Ready to Streamline Your Invoicing?</h2>
                    <p className="lead mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                        Join thousands of freelancers and small businesses who trust Quick Invoice.
                        Start creating professional invoices today – its fast, easy, and effective!
                    </p>
                    <button className="btn btn-lg btn-warning fw-bold rounded-pill px-5 py-3">
                        Start Generating Invoices Now
                    </button>
                    <p className="mt-3 small">
                        (This will lead to the invoice generation interface)
                    </p>
                </div>
            </section>

            {/* Footer: Copyright and social media links */}
            <footer className="py-5 bg-dark text-white-50">
                <div className="container text-center">
                    <Logo />
                    <p className="text-white fw-bold mt-2">Quick Invoice</p>
                    <p className="mb-0">
                        &copy; {new Date().getFullYear()} Quick Invoice. All Rights Reserved.
                    </p>
                    <p className="mb-0 small">
                        Crafted with <i className="bi bi-heart-fill text-danger"></i> for freelancers and small businesses.
                    </p>
                    <p className="mt-2">
                        {/* Placeholder social media links */}
                        <a href="#" className="text-white-50 me-2"><Instagram /></a>
                        <a href="#" className="text-white-50 me-2"><Facebook /></a>
                        <a href="#" className="text-white-50 me-2"><Linkedin /></a>
                    </p>
                </div>
            </footer>
        

           
        </>
    );
}

export default LandingPage;