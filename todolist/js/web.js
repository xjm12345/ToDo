var app = new Vue({   //创建Vue对象实例
    el:"#app", //挂载DOM元素的ID
    data: {
        todos:[{
            isSelected:false,
            title:'完成Web前端高级技术基础大作业需求分析'
        },{
            isSelected:false,
            title:'完成Web前端高级技术基础大作业系统分析'
        },{
            isSelected:false,
            title:'完成Web前端高级技术基础大作业系统设计'
        },{
            isSelected:false,
            title:'完善Web前端高级技术基础大作业相关功能'
        },{
            isSelected:false,
            title:'完成Web前端高级技术基础大作业实验报告'
        }],
        title:'',
        cur:'',
    },
    directives:{
        focus(el,bindings){
            //当cur==todo时获取焦点（当点击li时让内部的输入框获取焦点）
            if(bindings.value){
                el.focus();//获取焦点
            }
        }
    },
    methods:{
        //新建任务
        add(){
            this.todos.push({
                isSelected:false,
                title:this.title
            });
            this.title = '';            
        },
        remove(todo){//拿到当前点击的和数组里面比对相等返回false
            this.todos = this.todos.filter(item=>item!==todo);
        },
        remember(todo){//当前传递的是todo(当前点击的一项)
            this.cur = todo;
        },
        cancel(){
            this.cur = '';
        },
    },
    
    computed:{
        count(){
            return this.todos.filter(item=>!item.isSelected).length;
        }
    }
});