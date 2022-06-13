var vm = new Vue({
    el:'#app',
    data:{
        placeholder:"Enter task here...",
        message:"",
        taskList : [],
        warning:"",
        filteredTasks: [],
        selectedFilter: "Select here to filter task",
        dark: false,
        curMode:"Dark",
    },
    methods:{
        addTask:function(event){
            if(this.message != ""){
                this.taskList.push({task:this.message, status:'Incomplete'});
                const idx = this.taskList.length - 1;
                localStorage.setItem(idx, JSON.stringify(this.taskList[idx])); //store
                this.warning = "";
            }
            else{
                this.warning = "You forgot to enter task!!!";
            }
            this.message = "";
            event.preventDefault();
        },
        deleteTask:function(index){
            this.taskList.splice(index,1);
            localStorage.removeItem(index);
            this.selectedFilter = "Select here to filter task";
        },
        taskCompleted: function(index){
            if(this.taskList[index].status == 'Incomplete'){
                
            }
            let curTask = JSON.parse(localStorage.getItem(index)) //there is no way to change the value.
            localStorage.removeItem(index);                        //so i am getting the value, deleting it and then again setting it with new value
            this.taskList[index].status = "Complete";
            curTask.status = "Complete";
            localStorage.setItem(index,JSON.stringify(curTask));
        },
        deleteAllTasks:function(event){
            try{
                for(x in localStorage){
                    if(!isNaN(x)){
                        localStorage.removeItem(x);
                    }
                }
                this.taskList = [] ;
            }
            catch(err){
                console.log(err);
            }
            event.preventDefault();
        },
        
        //ToChangeCSS
        changeMode: function(event){
            this.dark = !this.dark;
            this.curMode = this.dark ? "Light" : "Dark";
            if(this.dark){
                document.body.classList.add("d");
            }
            else{
                document.body.classList.remove("d");
            }
            event.preventDefault();
        },
        mouseOver: () => {
            document.getElementById("delAll").classList.add("btn-outline-danger");
        },
        mouseOut: () => {
            document.getElementById("delAll").classList.remove("btn-outline-danger");
            document.getElementById("delAll").classList.add("btn-outline-primary");
        },

    },
    watch:{
        message(val){
            if(val.length != 0){
                this.warning = ""
            }
            let num = "0123456789";
            for(let i=0; i<val.length; i++){
                if( num.includes(val[i]) && this.warning.length == 0){
                    this.warning = "You tried entering a number. Please enter alpha character.";
                    this.message = "";
                }
            }
        },
        taskList(){
            this.filteredTasks = this.taskList
        },
        selectedFilter(val){
            if(val == "Complete" || val == "Incomplete"){
                this.filteredTasks = this.taskList.filter((task) => {
                    return task.status == val;
                })
            }
            else{
                this.filteredTasks = this.taskList;
            }
        }
    },
    mounted(){
        try{
            for(x in localStorage){
                if(!isNaN(x)){
                    let item = JSON.parse(localStorage.getItem(x));
                    this.taskList.push(item)
                }
            }
        }
        catch(err) {
            this.taskList = []
        }
    }
})

/*
create task
delete task
mark them as complete incomplete
filter task
*/