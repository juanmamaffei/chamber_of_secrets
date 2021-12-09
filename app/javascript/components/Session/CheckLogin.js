import axios from 'axios'

function isLoggedIn() {
    let response = axios.get("/api/v1/logged_in")
        .then(r=> { Boolean(r.data.logged_in); console.log(r.data.logged_in)
        })
        .catch(r=> console.log(r))
    return response
}

export default isLoggedIn