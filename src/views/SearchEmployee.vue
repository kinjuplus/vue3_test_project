<template>
    <div class="bootstrap-modal-no-jquery">
    <div class="modal" tabindex="-1" role="dialog" id="myModal">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Search Employee</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
               <div class="card">
                     <div class="card-body">
                          <form id="employeeSelectorForm" method="post" th:action="@{/picker/searchEmployee}" th:object="${picker}">              
                              <div class="row form-group">
                                <div class="col-md-6">
                                  <input type="text" id="criteria" name="criteria"  v-model="criteria"  th:required="required" placeholder="EmpNo. / Name / Ext / E-mail" class="form-control" />
                                </div>
                                <div class="col-md-6">
                                  <button type="button" class="btn btn-primary btn-sm" @click="findEmployeesByKeyword"><font-awesome-icon :icon="['fas', 'fa-dot-circle']" />Query </button>
                                </div>
                              </div>
                          </form>
                     </div>
               </div>
               <br/>
               <div class="card">
                     <div class="card-header"><i class="fas fa-table"></i> Search Result</div>
                     <div class="card-body">
                      <table class="table table-bordered table-striped table-hover" id="resultTable">
                              <thead>
                                <tr>
                                  <th width="10%" align="center">Select</th>
                                  <th width="10%">Emp No</th>
                                  <th width="15%">Emp Name</th>
                                  <th width="15%">Ext. No</th>
                                  <th width="15%">Dept No</th>
                                  <th width="15%">E-mail</th>
                                </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                     <td colspan="6">No Data Found</td> 
                                  </tr>
                              </tbody>
                       </table>

                     </div>
               </div>    
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="selectEmployee">Select Employee</button>
            <button type="button" class="btn btn-secondary" @click="hideModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
   
</template>
<script>
import { Modal } from 'bootstrap'
import Repository from "../repository/RepositoryFactory";
import $ from 'jquery';
  const EmployeeRepository = Repository.get("employees");

  export default {
    name: "SearchEmployee",
    data: () => ({
        modalInstance: null,
        criteria:''
    }),
    props: {
      showModal: {
        type: Boolean,
        default: false
      },
      formId:{
        type: String,
      },
      fields:{
        type: String,
      },
      colIndexs:{
        type: String,
      }
    },
    watch: {
      showModal(newValue, oldValue) {
        console.log(`newValue : ${newValue} oldValue: ${oldValue}`);
        if (newValue === true) {
          this.modalActive();
        }
      }
    },
    methods: {
          modalActive: function () {
            this.modalInstance = new Modal(document.getElementById('myModal'), {
              target: "#my-modal",
            });
            this.modalInstance.show()
          },
          hideModal: function () {
            console.log("closed");
            this.modalInstance.hide();
            this.$emit('closeModal');
          },
          async findEmployeesByKeyword(){
             if(!this.criteria){
               alert('Please input your criteria');
               return false;
             }
             let { data } = await EmployeeRepository.findEmployeeByKeyword(this.criteria);
             $('#resultTable').find('tbody').empty();
             if(data.length){
               for(let row of data.values()){
                  $('#resultTable').find('tbody').append(`<tr>
                             <td><input type="radio" name="selectedEmp" value="${row.emp_no}|${row.name}|${row.ext_no}|${row.dept_no}|${row.ad_account}|${row.manager_id}|${row.ad_account}(${row.name}/${row.ext_no})"/></td>
                             <td>${row.emp_no}</td>
                             <td>${row.name}</td>
                             <td>${row.ext_no}</td>
                             <td>${row.dept_no}</td>
                             <td>${row.e_mail}</td>
                        </tr>`);
               }
             }else{
                $('#resultTable').find('tbody').append(`<tr><td colspan="6">No Data Found</td></tr>`);
             }
          },
          selectEmployee(){
            if ($("input[name='selectedEmp']:checked").val() == undefined) {
               alert('Please select a employee');
               return false;
            }else{
                let aryBackFields = this.fields.split(",");
					      let aryBackColIndexs = this.colIndexs.split(",");
                let aryBackFieldValues = new Array();
						
						    let employeeInfo = $("input:radio:checked").val();
                let res = employeeInfo.split("|");
                /*let empNo = res[0];
                let name = res[1];
                let extNo = res[2];
                let deptNo = res[3];
                let shortName = res[4];
                let eMail = res[5];
                let displayValue = res[6];			*/
                $.each( aryBackColIndexs, function(index, value){ 
                  aryBackFieldValues.push(res[value]);
                }); 
                this.$emit('updateProjectOwner', { formId: this.formId, fields:aryBackFields, fieldValues: aryBackFieldValues} );
                this.$emit('closeModal');
                this.modalInstance.hide();
            }  
          }
     }
  }  

</script>

<style scoped>
 
</style>