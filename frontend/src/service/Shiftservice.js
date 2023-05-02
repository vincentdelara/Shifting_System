import axios from "axios";
const BASE_URL = "http://localhost:8090/datas";


class Shiftservice {


    getAllData() {
        return axios.get(BASE_URL);
    }

    saveData(shiftdata) {
        return axios.post(BASE_URL, shiftdata);
    }

    updateData(id, shiftdata) {
        return axios.put(`${BASE_URL}/${id}`, shiftdata)
    }
    getDataById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }
    deleteData(id) {
        return axios.delete(BASE_URL + "/" + id);
    }
}
export default new Shiftservice();