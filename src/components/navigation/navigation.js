import React from 'react';

const Navigation = ({onRouteChange, route}) => {
    switch(route) {
        case 'home': 
            {
                return (
                    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                    </nav>
                )
            }
        case 'register':
            {
                return (
                    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                    </nav>
                )
            }
        case 'signin': case 'signout':
            {
                return (
                    // style={{visibility: 'hidden'}}
                    <div className='b center f-subheadline white pt4 pb4'> 
                    Welcome to YabasBrains!
                    </div>
                )
            }
        default: 
            {
                return (
                    <div> </div>
                )
            }
    }
}

export default Navigation;