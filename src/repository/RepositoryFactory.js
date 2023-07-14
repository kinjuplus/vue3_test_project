import ConstantSettingRepository from './ConstantSettingRepository';
import EmployeeRepository from './EmployeeRepository';
import ProjectRepository from './ProjectRepository';

const repositories = {
    'constants': ConstantSettingRepository, 
    'employees': EmployeeRepository,
    'projects': ProjectRepository,
}
export default {
    get: name => repositories[name]
};