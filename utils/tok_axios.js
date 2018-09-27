import axios from 'axios';

const tok_conf = {
    baseURL: 'http://103.218.243.249',
    mode: 'no-cors',
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization,Origin, X-Requested-With, Content-Type, Accept"
    },
    timeout: 15000,
};

const service = axios.create(tok_conf)

service.interceptors.response.use(
    function(response) {
      return Promise.resolve(response)
    },
    function(error) {
      return Promise.reject(error)
    }
)

const TICKER_URL = '/1.0/rest/market/ticker';

const USER_AGENT = '';

const HEADERS = {
    'User-Agent' : USER_AGENT,
    'Content-Type':'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization, Origin, X-Requested-With, Content-Type, Accept"
}

var gate_axios = {

    TICKER_URL: TICKER_URL,

    service: service,

};

export default gate_axios;
