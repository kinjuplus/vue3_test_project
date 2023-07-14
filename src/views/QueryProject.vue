/* eslint-disable */
<template>
    <body class="sb-nav-fixed">
       <header-view/>
       <div id="layoutSidenav">  
             <menu-view></menu-view>
             <div id="layoutSidenav_content">
                  <main>
                    <div class="container-fluid px-4">
                      <h1 class="mt-4">{{ $t('queryProject') }}</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">{{ $t('queryProject') }}</li>
                        </ol>
                        <div class="card">
                                 <div class="card-body">
                                      <form id="searchForm">
                                              <div class="row g-3">
                                                  <div class="col-md-6">
                                                        <label class="col-form-label">BU</label>
                                                        <select class="form-control" id="bu" name="bu" :on-change="getApplications()" v-model="selectedBu">
                                                              <option v-for="(item,index ) in bu " :key="index"  :value="item">{{ item }}</option>
                                                        </select>
                                                  </div>
                                                        <div class="col-md-6">
                                                        <label class="col-form-label">Application</label>
                                                        <select class="form-control" id="application" name="application"  v-model="selectedApplication">
                                                            <option v-for="(item,index ) in applicationOptions " :key="index"  :value="item">{{ item }}</option>
                                                        </select>
                                                  </div>
                                              </div>
                                              <div class="row g-3">
                                                  <div class="col-md-6">
                                                        <label class="col-form-label">Product ID</label>
                                                        <input type="text" id="productId" placeholder="Product ID" class="form-control" name="productId"/>
                                                  </div>
                                                        <div class="col-md-6">
                                                        <label class="col-form-label">Model Name</label>
                                                        <input type="text" id="modelName" placeholder="Model Name" class="form-control" name="modelName"/>
                                                  </div>
                                              </div>
                                              <div class="row g-3">
                                                      <div class="col-md-6">
                                                      <label class="col-form-label">Project Owner</label>
                                                      <div class="input-group">
                                                            <input type="hidden" id="projectOwnerEmpNo" placeholder="Project Owner" class="form-control" name="projectOwnerEmpNo" />
                                                            <input type="text" id="projectOwnerDisplay" name = "projectOwnerDisplay"  placeholder="Project Owner" class="form-control" readonly="true" style="background-color: #CCCCCC;"/>  	  
                                                            <div class="input-group-append">
                                                            <button type="button" class="btn btn-primary" @click="popSearchWindow()"><font-awesome-icon :icon="['fas', 'fa-search']" /></button>
                                                            <button type="button" class="btn btn-secondary" onclick="clearProjectOwner()"><font-awesome-icon :icon="['fas', 'fa-eraser']" /></button>
                                                          </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                      <label class="col-form-label">State</label>
                                                        <select class="form-control" id="projectState" name="projectState" >
                                                            <option value=""></option>
                                                            <option value="Open">Open</option>
                                                            <option value="Close">Close</option>
                                                        </select>
                                                    </div>
                                              </div>   
                                      </form>
                                 </div>
                                 <div class="card-footer">
                                       <button type="button" class="btn btn-primary btn-sm" form="searchForm" @click="submitSearch()">
                                             <font-awesome-icon :icon="['fas', 'fa-dot-circle']" /> Submit
		                                   </button>
	                                     <button type="button" class="btn btn-danger btn-sm" form="searchForm" onclick="window.location.reload(true)">
                                             <font-awesome-icon :icon="['fas', 'fa-ban']" /> Reset
	                                      </button>
 
                                 </div>
                          </div>
                          <br/>
                          <br/>
                          <div class="card">
                               <div class="card-body">
                                   <div class="table-responsive">
                                        <!-- <table class="table table-striped table-bordered table-hover nowrap" id="projectSearchResult" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th>BU</th>
                                                        <th>Application</th>
                                                        <th>Product ID</th>
                                                        <th>Model Name</th>
                                                        <th>Project Owner</th>
                                                        <th>Project Type</th>
                                                        <th>Modified Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                     <template v-if="searchProjectResult.length == 0">
                                                         <tr>
                                                             <td colspan="7">No Data Found</td>
                                                          </tr>
                                                     </template>
                                                     <template v-if="searchProjectResult.length > 0">
                                                         <tr v-for="row in searchProjectResult" :key="row.product_id">
                                                              <td>{{ row.bu }}</td>
                                                              <td>{{ row.application }}</td>
                                                              <td>{{ row.product_id }}</td>
                                                              <td>{{ row.model_name }}</td>
                                                              <td>{{ row.projectOwnerDisplay }}</td>
                                                              <td>{{ row.project_type }}</td>
                                                              <td>{{ row.last_modified_date }}</td>
                                                         </tr>
                                                    </template> 
                                                </tbody>
                                        </table>-->  
                                        <data-table class="display table table-striped table-bordered table-hover nowrap"  :columns="searchProjectResultColumns" :data="searchProjectResult" :options="{ searching: false }">
                                               <thead>
                                                    <tr>
                                                        <th>BU</th>
                                                        <th>Application</th>
                                                        <th>Product ID</th>
                                                        <th>Model Name</th>
                                                        <th>Project Owner</th>
                                                        <th>Project Type</th>
                                                        <th>Modified Time</th>
                                                    </tr>
                                                </thead>

                                        </data-table>
                                   </div> 
                               </div>
                          </div>      
                      </div>  
                  </main>
                  <footer-view></footer-view>
                    
                        <!--<search-employee v-if="showModal" @close-modal-event="hideModal"></search-employee> -->
                        <search-employee  @closeModal="dataModal = false" :showModal="dataModal" form-id="searchForm" fields="projectOwnerEmpNo,projectOwnerDisplay" colIndexs="0,6" @updateProjectOwner="updateProjectOwner"></search-employee>
                  
                        
              </div>   
        </div>
    </body>
  </template>
  
  
  <script>
  // @ is an alias to /src
  import SearchEmployee from "@/views/SearchEmployee.vue";
  import MenuView from "@/components/MenuView.vue";
  import HeaderView from "@/components/HeaderView.vue";
  import FooterView from "@/components/FooterView.vue";
  import Repository from "../repository/RepositoryFactory";
  import $ from 'jquery';
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net-bs5';
 


  DataTable.use(DataTablesCore);
  const ConstantRepository = Repository.get("constants");
  const ProjectRepository = Repository.get("projects");

  
  export default {
    name: "QueryProject",
    data(){
        return {
            bu: [],
            buAppMap:{},
            selectedBu:'',
            selectedApplication:'',
            applicationOptions:[],
            searchProjectResult:[],
            dataModal:false,
            searchProjectResultColumns:[
                { data: 'bu' },
                { data: 'application' },
                { data: 'product_id' },
                { data: 'model_name' },
                { data: 'projectOwnerDisplay' },
                { data: 'project_type' },
                { data: 'last_modified_date' },
            ]
        }
    },
    created() {
      this.getBus();
    },
    
    methods: {
        getBus: async function() {
          const { data } = await ConstantRepository.getConstantByKey('BU_APPLICATION_MAP');
          this.buAppMap = JSON.parse(data['constant_value']);
          this.bu = Object.keys(this.buAppMap);
        },
        getApplications(){
            this.applicationOptions = this.buAppMap[this.selectedBu];
        },
        popSearchWindow(){
          this.dataModal = true;
        },
        hideModal() {
           this.dataModal = false;
        },
        updateProjectOwner({formId, fields, fieldValues}){
          console.log(`formId: ${formId} fields:${fields} fieldValues:${fieldValues}`);
          for (let i = 0; i < fields.length; i++) {
             document.getElementById(formId).elements.namedItem(fields[i]).value = fieldValues[i];
          }   
        },
        async submitSearch(){
           let requestObj = $('#searchForm').serializeArray().reduce(function(obj, item) {
                if(item.value){
                  obj[item.name] = item.value;
                }
                return obj;
            }, {});
            
            if(Object.keys(requestObj).length ==0 ){
              alert('Please specify at least one condition');
              return false;
            }
            let loader = this.$loading.show({ height:128, width: 128, color:"rgb(0,255,98)"});
            const { data } = await ProjectRepository.findProjectsByParams(requestObj);
            loader.hide();
            this.searchProjectResult = data;
        }

     },
     

     components: {
        MenuView,
        HeaderView,
        FooterView,
        SearchEmployee,
        DataTable
     },
    
  };
  </script>
  
<style @scoped>
@import 'bootstrap';
@import 'datatables.net-bs5';
</style>
