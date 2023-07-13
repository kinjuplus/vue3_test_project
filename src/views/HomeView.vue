<template>
  <body class="sb-nav-fixed">
     <header-view/>
     <div id="layoutSidenav">  
           <menu-view></menu-view>
           <div id="layoutSidenav_content">
                <main>
                  
                </main>
                <footer-view></footer-view>
            </div>   
      </div>
  </body>
</template>


<script>
// @ is an alias to /src
import MenuView from "@/components/MenuView.vue";
import HeaderView from "@/components/HeaderView.vue";
import FooterView from "@/components/FooterView.vue";


export default {
  name: "HomeView",
  components: {
    MenuView,
    HeaderView,
    FooterView
  },
  
};
</script>
