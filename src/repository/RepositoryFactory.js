import ConstantSettingRepository from './ConstantSettingRepository';
import EmployeeRepository from './EmployeeRepository';

const repositories = {
    'constants': ConstantSettingRepository, 
    'employees': EmployeeRepository,       
}
export default {
    get: name => repositories[name]
};