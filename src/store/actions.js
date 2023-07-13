//import axios from "axios";
import Repository from "../repository/RepositoryFactory";
const EmployeeRepository = Repository.get("employees");

export const loadUserInfo = ({commit}, { empNo }) => {
    console.log(`emp_no: ${empNo}`);
    EmployeeRepository.findEmployeeByEmpNo(empNo).then(function (response) {
        commit('setUserInfo', response.data[0]);				 
    }).catch(function (error) {
        console.log(error);
    }); 	
}; 