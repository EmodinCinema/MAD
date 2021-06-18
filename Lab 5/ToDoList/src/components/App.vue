<template>
  <Page  class="app">
    <StackLayout>
      <TextField class="input" v-model="newText" hint="Введите задачу"  @returnPress= "newTask()"/>
      <ScrollView orientation="horizontal">
        <ListView  class="task" for="task in tasks">
          <v-template>
            <GridLayout columns="250%, 70, 70">
            <label  class="task-text done" v-if="task.done" textWrap="true" col="0">{{task.title}}</label>
            <label  class="task-text" v-else  @tap="edit(task.id, task.title)" textWrap="true" col="0">{{task.title}}</label>
            <Button  class="btn_check" text="✔️" @tap="taskDone(task.id)" col="1"/>
            <Button  class="btn_remove" text="❌" @tap="remove(task.id)" col="2"/> 
            </GridLayout>
          </v-template>
        </ListView>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import * as ApplicationSettings from "application-settings";
export default {
  data () {
    return {
      newText: '',
      tasks: []
    }
  },
  mounted(){
    if(ApplicationSettings.getString('tasks')){
      this.tasks=Object.values(JSON.parse(ApplicationSettings.getString('tasks')));
    }
  },
  methods: {
    newTask () {
      if(this.newText != ''){
        this.tasks.push({
          id: Math.random(),
          title: this.newText,
          done: false
        });
        this.newText = '';
      }
      this.save();
    },
    taskDone (id) {
      this.tasks = this.tasks.map(task => {
        if (task.id == id) task.done = !task.done;
        return task;
      })
      this.save();
    },
    remove (id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.save();
    },
    save(){
      let toSave = Object.assign({}, this.tasks);
      ApplicationSettings.setString('tasks', JSON.stringify(toSave));
    },
    
    edit(id, old_text) {
      prompt({
        title: "Изменение задачи",
        message: "Новая задача:",
        okButtonText: "OK",
        cancelButtonText: "Отмена",
        defaultText: old_text,
      })
      .then(result => {
         this.tasks.forEach(task => {
          if (task.id == id && result.text != ''){
            task.title = result.text;
            this.save();
          }    
         });
      })
    }
  }
}
</script>
<style scoped>
    .app{
      background-color:rgb(212, 253, 240);
    }
    .btn_remove{
      color:darkred;
    }
    .task-text{
      background-color:darkturquoise;
      padding: 10px;
      flex-direction: row;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-items: space-between;
      margin: 20px 0;
      width: 390px;
      border-radius: 20%;
      color:white;
    
    }
    .done{
      padding: 10px;
      color:white;
      background-color:silver;
      flex-direction: row;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 20px 0;
      width: 390px;
    }
    .input{
      background-color:rgba(252, 74, 74, 0.919);
      border-radius: 10%;
      color:white;
      margin: 50px 30px;
      text-align: center;
}
    .input:focus{
      background-color:rgba(255, 115, 115, 0.919);
      border-radius: 0%;
      color:white;
}
    .btn_check{
      color:chartreuse;
}
    hint{
      color:white;
}
</style>
