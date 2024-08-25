import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <>

            <Helmet>

                <meta charSet="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" conten={author} />
                <title>{title}</title>
            </Helmet>


            <Header />

            <main style={{ minHeight: "80vh" }}>
                <Toaster />
                {children}
            </main>

            <Footer />
        </>
    )
};

Layout.defaultProps = {
    title: "Ecommerce- App",
    description: "Ecommerce- App where you can shop everything",
    keywords: "mern app",
    author: "Muhammad Abdullah"
}

export default Layout