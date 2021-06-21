Vue.component("task", {
    props: ["data"],
    methods: {
        task_done: function(){
            this.$emit('task_done');
         }
    },
    template: `
    <div class="task" >
                    <div>
                        <h3 class="task_title">{{data.title}}</h3>
                        <p class="task_desc">{{data.desc}}</p>
                    </div>
                    <button @click="task_done()" class="task_delet">✔️</button>
                </div>`
});
var vue = new Vue({
    el: '#app',
    data: {
        new_task:
    {
        title:'',
        desc:'',

    },
        tasks:[
        {
            title: 'Сделать лабораторную',
            desc: 'Сесть на стул, включить компьютер, изучить материал, написать программу',
        },
        ]
    },
    methods: {
        delete_task: function(index){
           this.tasks.splice(index, 1);
       },
        add_task: function(index){
           if(this.new_task.title!=''){
               this.tasks.push({
                title: this.new_task.title,
                desc: this.new_task.desc,
               });
               this.new_task.title='';
               this.new_task.desc='';
           } 
       },
       
    }
});