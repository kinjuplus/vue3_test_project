import Client from '../Clients/AxiosClient';
const resource = '/projects';

export default {
    findProjectsByParams(requestContent) {
        return Client.post(`${resource}/queryProjectByParams`, requestContent);
    },
    getProjectById(productId) {
        return Client.get(`${resource}/getProjectById?product_id=${productId}`);
    },
}