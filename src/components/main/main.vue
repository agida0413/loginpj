<template>

    <h1> 메인</h1>
    <button @click="test">클릭</button>
</template>
<script>
import axios from 'axios';

export default{
    
    methods:{
        test(){
            axios.get('/api/test').then((res)=>{
                console.log(res.data)
            })
                
            
        }
    }

}
</script>