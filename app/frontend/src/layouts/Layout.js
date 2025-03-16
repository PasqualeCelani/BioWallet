import React from 'react';
import Header from '../components/Header';

const Layout =({children}) =>{
    return(
       <html lang="en">
        <head></head>
        <body>
            <Header />
            {children}
        </body>
       </html>
    )
}

export default Layout;