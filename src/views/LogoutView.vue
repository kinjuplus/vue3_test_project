

<script>


 export default {
     name: "LogoutView",
     mounted(){
        this.$store.dispatch("clearUserInfo", null);
        localStorage.removeItem('locale');
        document.cookie = 'SSOToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.$router.push('/doLogout');
     }
 }

</script>
