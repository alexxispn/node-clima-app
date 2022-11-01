import axios from "axios";

export default class HttpsClient {
    constructor() {
    }

    async get(url) {
        const resp = await axios.get(url);
        return resp.data;
    }

    async instance(url, params) {
        const inst = await axios.create({
            baseURL: url,
            params
        });
        const resp = await inst.get();
        return resp.data;
    }
}
