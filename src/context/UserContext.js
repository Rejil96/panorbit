import React from 'react'

const UserContext = React.createContext({
    currentUser: {},
    randomUser: [],
    onUpdateCurrentUser: () => {},
    onUpdateRandomUser: () => {}
})

export default UserContext