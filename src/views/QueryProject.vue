/* eslint-disable */
<template>
    <body class="sb-nav-fixed">
       <header-view/>
       <div id="layoutSidenav">  
             <menu-view></menu-view>
             <div id="layoutSidenav_content">
                  <main>
                    <div class="container-fluid px-4">
                      <h1 class="mt-4">Query Project</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">Query Project</li>
                        </ol>
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
                                              <input type="text" id="projectOwnerDisplay" name = "projectOwnerDisplay"  placeholder="Project Owner" class="form-control" readonly="true"/>  	  
                                              <div class="input-group-append">
                                              <button type="button" class="btn btn-primary" @click="popSearchWindow()"><font-awesome-icon :icon="['fas', 'fa-search']" /></button>
                                              <button type="button" class="btn btn-secondary" onclick="clearProjectOwner()"><font-awesome-icon :icon="['fas', 'fa-eraser']" /></button>
                                            </div>
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                        <label class="col-form-label">State</label>
                                          <select class="form-control" id="projectState" name="projectState" th:field="*{projectState}">
                                              <option value=""></option>
                                              <option value="Open">Open</option>
                                              <option value="Close">Close</option>
                                          </select>
                                      </div>
                                </div>   
                        </form>
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
  const ConstantRepository = Repository.get("constants");

  
  export default {
    name: "QueryProject",
    data(){
        return {
            bu: [],
            buAppMap:{},
            selectedBu:'',
            selectedApplication:'',
            applicationOptions:[],
            msg:'test',
            visible: false,
            dataModal:false
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
 
        }

     },
     

     components: {
        MenuView,
        HeaderView,
        FooterView,
        SearchEmployee
     },
    
  };
  </script>
  