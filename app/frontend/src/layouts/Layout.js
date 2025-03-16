import React from 'react';

const Layout =({children}) =>{
    return(
       <html lang="en">
        <head></head>
        <body className="bg-black">
            {children}
        </body>
       </html>
    )
}

export default Layout;