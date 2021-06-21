var vue = new Vue({
    el: '#app',
    data: {
        result:'',
        numbers: [0,1,2,3,4,5,6,7,8,9],
        operations: [ '(',')','+','-','/','*','.'],    
    },
    methods:{
        input: function(char){
            this.result=this.result.toString();
            this.result+=char;
        },
        reset: function(){
            this.result='';
        },
        cal: function(){
            this.result=eval(this.result);
        },
    }
})