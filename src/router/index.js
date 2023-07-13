/* eslint-disable */
/* eslint-disable no-useless-escape */
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import QueryProject from "../views/QueryProject.vue";
import SearchEmployee from "../views/SearchEmployee.vue";
import $ from 'jquery';
import axios from "axios";
import store from '@/store'

let baseAddr = '//tsamv4athe.cminl.oa';
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta:{
        metaTags: [
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            }
          ]
      }
  },
  {
    path: "/searchEmployee",
    name: "searchEmployee",
    props: true,
    component: SearchEmployee,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "loginForm",
    redirect: () => {
      window.location.href = `http://tsamv4athe.cminl.oa/form/Logon.html?url=${window.location.origin}&SysID=INNOPLM`;
    },
  },
  {
    path: "/queryProject",
    name: "queryProject",
    component: QueryProject,
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to,from) => {
  let Token = QueryStringCase("Token");
  Token = Token ? Token : getCookie("SSOToken");
  console.log(Token);
  if (Token) {
    let result = await verifyTicket(Token, setUserInfo, false);
    console.log(Token);
    console.log(result);
    if(result){
       return true; 
    }else{
        return { name: "loginForm" };      
    }
  } else {
    return { name: "loginForm" };  
  }
});

async function verifyTicket(key, setUserInfo, CheckIP) {
  var ssoretry = parseInt(QueryStringCase("ssoretry"), 10);
  if (isNaN(ssoretry))
      ssoretry = 0;
  var data = {
      "Token": key,
      "IsCheckIP": CheckIP,
      "SysID":"INNOPLM"
  };
  let result = false;
  await $.ajax({
      type: "Post",
      //xhrFields: {
      //    withCredentials: true
      //},
      url: baseAddr + "/api/SSO/VerifyToken",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: async function (userInfo) {
          document.cookie = "SSOToken=" + userInfo["SSOToken"] + ";path=/";
          if (window.console)
              console.log(userInfo);
          HideToken(userInfo);
          setUserInfo(userInfo);
          result = true;
      },
      error: function (e) {
          /*
          if (ssoretry < 8) {
              var url = baseAddr + '/form/Logon.html?url=' + encodeURIComponent(AddStringCase(DeleteStringCase(location.href, "Token"), "ssoretry", ++ssoretry));
              console.log('url=', url);
              window.location.href = url;
          }
          else if (e.responseJSON) {
              alert(e.responseJSON.Message);
          }
          else {
              alert("verifyTicket Unknown Error!");
          }
          */

          if (e.responseJSON) {
              if (e.responseJSON.ErrorCode == "9002" || e.responseJSON.ErrorCode == "9003") {
                  if (ssoretry < 8) {
                      var url = baseAddr + '/form/Logon.html?url=' + encodeURIComponent(AddStringCase(DeleteStringCase(location.href, "Token"), "ssoretry", ++ssoretry));
                      if (window.console)
                          console.log('url=', url);
                      window.location.replace(url);
                  }
                  else {
                      alert(e.responseJSON.Message);
                  }
              }
              else {
                  alert(e.responseJSON.Message);
              }
          }
          else {
              alert("verifyTicket Unknown Error!");
          }
          result = false;
      }
  });
  return result;
}


function setUserInfo(userInfo){
   store.dispatch("loadUserInfo",{empNo: userInfo.MemID});
}

function HideToken() {
    var url = DeleteStringCase(DeleteStringCase(location.href, "ssoretry"), "Token");
    window.history.replaceState(null, null, url);
}


function QueryStringCase(name, defaultValue) {
  if (defaultValue === undefined) {
      defaultValue = null;
  }
  var reg = new RegExp("(^|&|\\?)" + name + "=([^\&\#]*)(&|$)?"), r;
  var s = location.href.split("?");
  if (s.length > 0)
      s = "?" + s[1];
  else
      s = "";
  r = s.match(reg);
  if (r) {
      r = unescape(r[2]);
      //alert('QueryString:' +r);
      return r;
  } else {
      return defaultValue;
  }
}


function DeleteStringCase(loc, name) {
  var reg = new RegExp("(^|&|\\?)" + name + "=([^\&\#]*)(&|$)?"), r, result;
  var s = loc.split("?");
  if (s.length > 0)
      s = "?" + s[1];
  else
      s = "";
  r = s.match(reg);
  if (r) {
      //r = unescape(r[0]);
      if (r[3] == "" || r[3] == null)
          result = loc.replace(r[0], "");
      else
          result = loc.replace(r[0], r[1]);
      return result;
  } else {
      return loc;
  }
}
function MoveHashTag(loc) {
  var reg = new RegExp("#+([^\&\?]*)"), r, result;
  var s = loc.split("?");
  if (s.length > 0)
      s = "?" + s[1];
  else
      s = "";
  r = s.match(reg);
  if (r) {
      result = loc.replace(r[0], "");
      result = result + r[0];
      return result;
  } else {
      return loc;
  }
}

function AddStringCase(loc, key, value) {
  var reg = new RegExp("(^|&|\\?)" + key + "=([^\&\#]*)(&|$)?"), r, result;
  var s = loc.split("?");
  if (s.length > 0)
      s = "?" + s[1];
  else
      s = "";
  r = s.match(reg);
  if (r) {
      result = loc.replace(r[0], (r[1] + key + "=" + value));
  } else {
      result = loc + ((loc.indexOf("?") != -1) ? '&' : '?') + key + "=" + value;
  }
  return MoveHashTag(result);
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length >= 2)
      return parts.pop().split(';').shift();
}




export default router;
