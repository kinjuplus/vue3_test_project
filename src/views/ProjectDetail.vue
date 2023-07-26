<template>
    <body class="sb-nav-fixed">
       <header-view/>
       <div id="layoutSidenav">  
             <menu-view></menu-view>
             <div id="layoutSidenav_content">
                  <main>
                        <div class="container-fluid px-4">
                            <h1 class="mt-4">{{ $t('projectDetail') }}</h1>
                                <ol class="breadcrumb mb-4">
                                    <li class="breadcrumb-item active">{{ $t('projectDetail') }}</li>
                                </ol>
                            <div class="card">
                                       <div class="card-header">
                                            <div class="hstack gap-3">
                                                    <div class="dropdown">
                                                        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                                                            Dropdown button
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li v-if="canWrite"><a class="dropdown-item" href="#">Manage Tasks</a></li>
                                                            <li><a class="dropdown-item" href="#">Edit Attribute</a></li>
                                                            <li><a class="dropdown-item" href="#">Copy As</a></li>
                                                            <li><a class="dropdown-item" href="#">Sync PLM Member</a></li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <font-awesome-icon :icon="['fas', 'folder']" size="2x"/>  
                                                    </div>
                                                    <div>
                                                         {{ project.product_id }}
                                                    </div> 
                                            </div> 
                                       </div>
                                       <div class="card-body">
                                             <ul class="nav nav-tabs">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" data-bs-toggle="tab" href="#projectDetailsTab">Detail</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" data-bs-toggle="tab" href="#projectTasksTab">Tasks</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" data-bs-toggle="tab" href="#projectChangeLogTab">PLM Change Log</a>
                                                    </li>  
                                             </ul>
                                             <div class="tab-content">
                                                    <div class="tab-pane container-fluid active float-start" id="projectDetailsTab">
                                                        <div class="accordion" id="accordionExample">
                                                                <div class="accordion-item">
                                                                        <h2 class="accordion-header" id="headingOne">
                                                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                                General
                                                                            </button>
                                                                        </h2>
                                                                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                                <div class="accordion-body">
                                                                                        <div class="row" style="align-items: center;">
                                                                                             <div class="col col-md-2"><label class="col-form-label">BU</label></div>
														                                     <div class="col-12 col-md-4"><span class="form-text">{{ project.bu }}</span></div>
														                                     <div class="col col-md-2"><label class="col-form-label">Application</label></div>
														                                     <div  class="col-12 col-md-4"><span class="form-text">{{ project.application }}</span></div>  

                                                                                        </div>
                                                                                        <div class="row" style="align-items: center;">
                                                                                                <div class="col col-md-2"><label class="col-form-label">Product ID</label></div>
                                                                                                <div class="col-12 col-md-4"><span class="form-text" th:text="${project.productId}">{{ project.product_id }}</span></div>
                                                                                                <div class="col col-md-2"><label class="col-form-label">State</label></div>
                                                                                                <div class="col-12 col-md-4" v-if="project.project_type == 'NPDP'" > <a  :href="npdpPhaseReportUrl" th:text="${project.phase}" target="_blank">{{ project.phase }}</a></div>
                                                                                                <div class="col-12 col-md-4" v-if="project.project_type == 'TECHNICAL'" ><span class="form-text" ></span></div>  
                                                                                        </div>

                                                                                </div>
                                                                        </div>
                                                                        <table class="table table-bordered border-primary">
                                                                            <thead>
                                                                                <tr>
                                                                                    <td>Role</td>
                                                                                    <td>Members</td>
                                                                                </tr>
                                                                            </thead>
                                                                             <tbody>
                                                                                <template v-if="projectMemberRoles.length > 0">
                                                                                     <tr v-for="role in projectMemberRoles" :key="role.id">
                                                                                          <td>
                                                                                            {{ role.name }}
                                                                                          </td>    
                                                                                          <td>
                                                                                              {{ role.memberList.map(a=>a.employee.name + '('+a.employee.emp_no+')').join(',') }}
                                                                                          </td> 
                                                                                     </tr> 

                                                                                </template>
                                                                                <template v-if="projectMemberRoles.length == 0">
                                                                                       <tr>
                                                                                          <td colspan="2">No Member Defined</td>
                                                                                       </tr>

                                                                                 </template>

                                                                             </tbody> 
                                                                        </table>
                                                                </div>
                                                                <div class="accordion-item">
                                                                    <h2 class="accordion-header" id="headingTwo">
                                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                        Accordion Item #2
                                                                    </button>
                                                                    </h2>
                                                                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                                    <div class="accordion-body">
                                                                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                <div class="accordion-item">
                                                                    <h2 class="accordion-header" id="headingThree">
                                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                        Accordion Item #3
                                                                    </button>
                                                                    </h2>
                                                                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                                    <div class="accordion-body">
                                                                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                        </div>

                                                    </div>
                                                    <div class="tab-pane container-fluid fade" id="projectTasksTab">
                                                        <div class="accordion" id="accordionTask">
                                                                <div class="accordion-item">
                                                                        <h2 class="accordion-header" id="headingThree">
                                                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                            任務清單
                                                                        </button>
                                                                        </h2>
                                                                        <div id="collapseThree" class="accordion-collapse collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                                                <div class="accordion-body">
                                                                                    <table class="table table-bordered border-primary">
                                                                                            <thead>
                                                                                                 <tr>
                                                                                                    <th></th>
                                                                                                     <th>Task Name</th>
                                                                                                     <th>Start Date</th>
                                                                                                     <th>End Date</th>
                                                                                                     <th>Actual Start Date</th>
                                                                                                     <th>Actual End Date</th>
                                                                                                     <th>Owner</th>
                                                                                                     <th>Key Word</th>
                                                                                                 </tr>   
                                                                                             </thead>
                                                                                             <tbody>
                                                                                                   <template v-if="projectTasks.length > 0">
                                                                                                       <tr v-for="task in projectTasks" :key="task.id">
                                                                                                            <td v-html="this.getDisplaySymbol(task.getDisplayColor)"></td>
                                                                                                            <td>{{ task.name }}</td> 
                                                                                                            <td>{{ $filters.formatDateStr(task.start_date) }}</td>
                                                                                                            <td>{{ $filters.formatDateStr(task.end_date) }}</td>
                                                                                                            <td>{{ $filters.formatDateStr(task.actual_start_date) }}</td>
                                                                                                            <td>{{ $filters.formatDateStr(task.actual_end_date) }}</td>
                                                                                                            <td>{{ task.ownerDisplay }}</td>
                                                                                                            <td>{{ task.key_word }}</td>
                                                                                                       </tr>
                                                                                                   </template>
                                                                                                   <template v-if="projectTasks.length == 0">
                                                                                                       <tr>
                                                                                                          <td colspan="7">No Tasks Defined</td>
                                                                                                       </tr>
                                                                                                    </template>

                                                                                             </tbody>

                                                                                        </table>
                                                                                </div>
                                                                        </div>
                                                                </div> 
                                                                
                                                          </div>

                                                    </div>
                                                    <div class="tab-pane container-fluid fade" id="projectChangeLogTab">projectChangeLogTab</div>
                                             </div>
                                       </div>          
                                 </div>

                            </div>    
                        
                  </main>
                  <footer-view></footer-view>             
              </div>   
        </div>
    </body>
</template>
<script>
  // @ is an alias to /src
import { toRaw } from 'vue';
import MenuView from "@/components/MenuView.vue";
import HeaderView from "@/components/HeaderView.vue";
import FooterView from "@/components/FooterView.vue";
import Repository from "../repository/RepositoryFactory";
const ProjectRepository = Repository.get("projects");

   export default {
       name: "ProjectDetail",
       data() {
         return {
            project:{},
            canWrite: false,
            npdpPhaseReportUrl:'',
            projectMemberRoles:[],
            projectTasks:[]
         }
       },
       async mounted(){
          let loader = this.$loading.show({ height:128, width: 128, color:"rgb(0,255,98)"});
          await this.getProject();
          loader.hide();
          console.log(this.project);
          this.canWrite = this.determineCanWrite();
          this.npdpPhaseReportUrl = process.env.VUE_APP_PLM_URL+`/npdp/report/showProjectDeliverableDoc?productId=${this.project.product_id}&phase=${this.project.phase}`;
          
       },
        methods: {
            getProject: async function() {
                const { data } = await ProjectRepository.getProjectById(this.$route.params.productId);       
                this.project = data;
                this.projectMemberRoles = this.project.memberRoleList;
                this.projectTasks = this.project.taskList.filter(a=>!/^DR\d{1}$/.test(a.name) && a.name != this.project.product_id  && a.children.length == 0);
                for(let task of this.projectTasks.values()){
                    let foundAssignemnt = this.project.assignments.filter(a=>a.task.id == task.id);
                    if(foundAssignemnt.length){
                        task['ownerDisplay'] = foundAssignemnt.map(a=>a.member.employee.name + '('+a.member.employee.emp_no+')').join(',');
                    }
                }
            },
            determineCanWrite(){
                if(this.$store.getters.hasAdminRole || this.project.owner.emp_no == this.$store.getters.getUserInfo.emp_no ){
                   return true;
                }
                const projectObj = toRaw(this.project);
                if(projectObj.memberRoleList && projectObj.memberRoleList.length){
                    let memberList = projectObj.memberRoleList.flatMap(r=>r.memberList);
                    if(memberList.findIndex(m=>m.employee.emp_no == this.$store.getters.getUserInfo.emp_no)!=-1 ){
                       return true;
                    }   
                }
                return false;
            },
            getDisplaySymbol(color){
                if(color=="red"){
                    return `<span class="red-alarm"></span>`;
                }else if(color=="yellow"){
                    return `<span class="yellow-alarm"></span>`;
                }else if(color=="blue"){
                    return `<span class="blue-alarm"></span>`;
                }else{
                    return "";
                }
            }
            
       },
       components: {
        MenuView,
        HeaderView,
        FooterView,
     },

   } 
</script>
