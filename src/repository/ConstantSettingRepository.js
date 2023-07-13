import Client from '../Clients/AxiosClient';
const resource = '/constants';


export default {
    getConstantByKey(constantKey) {
        return Client.get(`${resource}/${constantKey}`);
    },
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