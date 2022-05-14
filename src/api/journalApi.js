
import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demos-df71b-default-rtdb.europe-west1.firebasedatabase.app'
})

//console.log( process.env.NODE_ENV )  // igual a 'test' durante testing

export default journalApi