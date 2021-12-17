import axios from 'axios'

function isLoggedIn() {
    let response = axios.get("/api/v1/logged_in")
        .then(r=> {  console.log(r.data.logged_in); return r.data.logged_in;
        })
        .catch(r=> false)
    return response
}

export default isLoggedIn