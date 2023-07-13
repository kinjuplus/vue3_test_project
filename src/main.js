import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faAngleDown, faBookOpen, faChartArea, faColumns, faTable, faUser, faUserSecret, faEraser, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "./assets/sb_admin/styles.css"
/* add icons to the library */
library.add(faUserSecret)
library.add(faPhone)
library.add(faTachometerAlt)
library.add(faSearch)
library.add(faBars)
library.add(faAngleDown)
library.add(faColumns)
library.add(faUser)
library.add(faBookOpen)
library.add(faChartArea)
library.add(faTable)
library.add(faEraser)
library.add(faDotCircle)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount("#app");
