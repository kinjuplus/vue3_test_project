import Client from '../Clients/AxiosClient';
const resource = '/projects';

export default {
    findProjectsByParams(requestContent) {
        return Client.post(`${resource}/queryProjectByParams`, requestContent);
    },
}