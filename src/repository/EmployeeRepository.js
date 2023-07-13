import Client from '../Clients/AxiosClient';
const resource = '/employees';

export default {
    findEmployeeByKeyword(keyword) {
        return Client.get(`${resource}/findEmployeeByKeyword?keyword=${keyword}`);
    },
    findEmployeeByEmpNo(empNo) {
        return Client.get(`${resource}/queryEmpByEmpNo?empNo=${empNo}`);
    }
    /*
    create(payload) {
        return Client.post(`${resource}`, payload);
    },
    update(payload, id) {
        return Client.put(`${resource}/${id}`, payload);
    },
    delete(id) {
        return Client.delete(`${resource}/${id}`)
    },
    */ 
    // MANY OTHER ENDPOINT RELATED STUFFS
};