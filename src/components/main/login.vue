<template>
  <div :class="['form', formType]">
    <div class="form-header">
      <div @click="setFormType('signup')" :class="{active: formType === 'signup'}">회원가입</div>
      <div @click="setFormType('signin')" :class="{active: formType === 'signin'}">로그인</div>
    </div>
    <div class="arrow"></div>
    <div class="form-elements">
      <div v-if="formType !== 'reset'" class="form-element">
        <input type="text" placeholder="Username" v-if="formType === 'signup' || formType === 'signin'" v-model="username">
      </div>
      <div class="form-element">
        <input type="password" placeholder="Password" v-model="password">
      </div>
      <div v-if="formType === 'signup'" class="form-element" >
        <input type="password" placeholder="Confirm password" v-model="secondPassword">
      </div>
      
    <span style="color: red;" v-show="alert"> {{ message }}</span>
    
      <div class="form-element">
        <button @click="handleMethod()">{{ buttonText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {

    return {
        
        username:'',
        password:'',
        secondPassword:'',
        message:'',
        alert:false,
      formType: 'signup' // 초기 폼 상태를 'signup'으로 설정
    };
  },
  computed: {
    buttonText() {
      if (this.formType === 'signup') {
        return '회원가입';
      } else if (this.formType === 'signin') {
        return '로그인';
      }
      return '';
    }
  },
  methods: {
    setFormType(type) {
      this.formType = type;
      this.alert=false
      this.username='',
      this.password='',
      this.secondPassword=''
    },
    handleMethod(){
      
        if(this.formType==='signup'){
         this.join()
        }
        else{
            this.login()
        }
    },

    login(){
        if(this.username===''|| this.username===null||this.username==='undefined'){
                this.message='입력하지 않은 정보가 있습니다.'
                this.alert=true
               
        return
            }
            if(this.password===''|| this.password===null||this.password==='undefined'){
                this.message='입력하지 않은 정보가 있습니다.',
                this.alert=true
                
        return
            }
            const formdata = new FormData()

            formdata.append('username',this.username)
            formdata.append('password',this.password)
              axios.post('/api/login',formdata).then((res)=>{
               
                const accessToken = res.headers['access'];
                localStorage.setItem('access',accessToken)

                const reqUrl=localStorage.getItem('requestUrl')
                if(reqUrl===undefined || reqUrl==='' || reqUrl===null){
                  this.$router.push('/');
                }else{
                  this.$router.push(reqUrl);
                }
             
                
              }).catch((err)=>{
                console.log(err)
                alert('로그인 실패')
            })
          
            
        
    },
    join(){
        if(this.username===''|| this.username===null||this.username==='undefined'){
                this.message='입력하지 않은 정보가 있습니다.'
                this.alert=true
        return
            }
            if(this.password===''|| this.password===null||this.password==='undefined'){
                this.message='입력하지 않은 정보가 있습니다.',
                this.alert=true
        return
            }
            if(!(this.password===this.secondPassword)){
                this.message='비밀번호 확인이 일치하지 않습니다.'
                this.alert= true
                return
            }
            
            const formdata = new FormData()

            formdata.append('username',this.username)
            formdata.append('password',this.password)

            axios.post('/api/join',formdata).then((res)=>{
              console.log(res.data)
            }).catch((err)=>{
              console.log(err)
            })

          }
        
        
        }   
  
};
</script>


  <style>
body {
  background:#2c2c2c;
  font-family:"Raleway";
}
.form {
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:300px;
  height:250px;
  padding:10px;
}
.form .form-header {
  height:30px;
  display:flex;
  align-items:center;
  text-align:center;
}
.form .form-header > div {
  width:calc(100% / 3);
  color:#ddd;
  font-size:18px;
  font-weight:600;
  cursor:pointer;
}
.form.signup .form-header div.show-signup {
  color:#f1575b;
}
.form.signin .form-header div.show-signin {
  color:#f1575b;
}
.form.reset .form-header div.show-reset {
  color:#f1575b;
}
.form .form-elements {
  margin-top:15px;
}
.form .form-elements .form-element {
  height:50px;
  opacity:1;
  overflow:hidden;
  transition:all 500ms ease-in-out;
}
.form .form-elements input {
  width:100%;
  padding:10px;
  font-size:16px;
  margin:5px 0px;
  border-radius:10px;
  box-sizing:border-box;
  border:1px solid #222;
  background:#f5f5f5;
}
.form .form-elements button {
  width:100%;
  padding:10px;
  font-size:16px;
  font-weight:600;
  margin-top:5px;
  border-radius:10px;
  background:#f1575b;
  color:#f5f5f5;
  cursor:pointer;
  border:none;
  outline:none;
}
.form .arrow {
  position:absolute;
  top:51px;
  width:0;
  height:0;
  border-left:10px solid transparent;
  border-right:10px solid transparent;
  border-bottom:10px solid #f5f5f5;
}
.form.signup .arrow {
  left:calc(calc(100% / 3) / 2);
}
.form.signin .arrow {
  left:calc(calc(100% / 3) + calc(calc(100% / 3) / 2.2)) ;
}
.form.reset .arrow {
  left:calc(calc(calc(100% / 3) * 2) + calc(calc(100% / 3) / 3)) ;
}


.form.reset .form-elements > div:nth-child(2),
.form.reset .form-elements > div:nth-child(3) {
  height:0px;
  opacity:0;
}

</style>