<template>
    <Page class="app">
        <ActionBar title="Calculator Grobovskiy" background-color="lightslategray"/>
        <GridLayout class="keyboard" columns="*, *, *, *" rows="*, *, *, *, *, *, *">
          <Label textWrap="true" class="result" v-model="result" row="0" col="0" colSpan="4"/>/>
          <Button class="cell num" text="1" @tap="input('1')" row="5" col="0"/>
          <Button class="cell num" text="2" @tap="input('2')" row="5" col="1"/>
          <Button class="cell num" text="3" @tap="input('3')" row="5" col="2"/>
          <Button class="cell num" text="4" @tap="input('4')" row="4" col="0"/>
          <Button class="cell num" text="5" @tap="input('5')" row="4" col="1"/>
          <Button class="cell num" text="6" @tap="input('6')" row="4" col="2"/>
          <Button class="cell num" text="7" @tap="input('7')" row="3" col="0"/>
          <Button class="cell num" text="8" @tap="input('8')" row="3" col="1"/>
          <Button class="cell num" text="9" @tap="input('9')" row="3" col="2"/>
          <Button class="zero" text="0" @tap="input('0')" row="6" col="0" colSpan="2"/>
          <Button class="cell do" text=")" @tap="input(')')" row="4" col="3"/>
          <Button class="cell do" text="(" @tap="input('(')" row="3" col="3"/>
          <Button class="ger op" text="C" @tap="reset('')" row="1" col="0" colSpan="4"/>
          <Button class="cell do" text="+" @tap="input('+')" row="2" col="0"/>
          <Button class="cell do" text="-" @tap="input('-')" row="2" col="1"/>
          <Button class="cell do" text="*" @tap="input('*')" row="2" col="2"/>
          <Button class="cell do" text="/" @tap="input('/')" row="2" col="3"/>
          <Button class="cell do" text="." @tap="input('.')" row="6" col="2"/>
          <!-- <Button class="ger op" text="<-" @tap="del()" row="1" col="2" colSpan="2"/> -->
          <Button class="equal" text="=" @tap="cal()" row="5" col="3" rowSpan="2"/>
        </GridLayout>
    </Page>
</template>

<script >
  export default {
  // //   data() {
  // //     return {
  // //       msg: 'Hello World!'
  // //     }
  // //   }
  // // }
  // var vue = new Vue({
  //   el: '#app',
    data() {
      return{
        result:'',
        // number: ['1','2','3','4','5','6','7','8','9','0'],
        // operations: ['+','-','/','*']
      }
    },
    methods:{
      
        input: function(char){
          this.result=this.result.toString();
          this.result+=char; 
        },
        // oper: function(){
        //   if(char.lenght == 1){
        //       if(!Number.isNumber(char)){
        //         this.char='не номер-ошибка';
        //       }
        //   }
        // },
        reset: function(){
            this.result='';
        },
        // del: function(char){
        //     this.result=char.lenght-1;
        // },
        cal: function(){
          try{
            this.result=eval(this.result);
            if(isNaN(this.result)){
              throw new Error();
            }
          }
          catch{
            this.result='неверный ввод';
          }
        },
        // del: function(char){
        //    this.result=this.resulte-1;
            
        // },
        
    }
}
</script>

<style scoped>
/* .app{
    background-color: lightslategray;
    
} */
.app {
    grid-gap: 1px;
    background-color:papayawhip;
    padding: 2px;
    border-radius: 2px;
    /* max-width: 300px;  */
    display: flex;
    justify-content: space-around;
    /* width: 100%;
    height: 400px; */
    flex-wrap: wrap;
}

.num {
    background-color:orange;
    color:black;
    padding: 10px;
    font-family: "Molot";
    text-align: center;
    align-items: center;
    font-size: 5px;
    cursor: pointer;
    font-family: "Molot";   
}
.op{
    background-color:rgb(140, 210, 230);
    font-family: "Molot";
}
.do{
    background-color:rgb(255, 58, 98);
    font-family: "Molot";
}
.cell{
    flex: 60px;
    height: 200px;
    width: 200px;
    font-size: 40px;
    border: none;
}
.result{
    width: 680px;
    height: 100px;
    border: 10;
    font-size: 30px;
    padding: 5px 5px;
    text-align: right;
    background-color:rgb(255, 250, 236);
}
.ger{
    flex: 60px;
    height: 200px;
    width: 800px;
    font-size: 40px;
    border: none;
}
.zero{
    flex: 60px;
    height: 200px;
    width: 400px;
    font-size: 40px;
    background-color:orange;
}
.equal{
    flex: 60px;
    height: 400px;
    width: 400px;
    font-size: 40px;
    border: none;
    background-color:rgb(140, 210, 230);
    font-family: "Molot";
}
</style>
