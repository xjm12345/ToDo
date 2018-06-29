var data = {
    todos:[{
        title:'完成Web前端高级技术基础大作业需求分析'
    },{
        title:'完成Web前端高级技术基础大作业系统分析'
    },{
        title:'完成Web前端高级技术基础大作业系统设计'
    },{
        title:'完善Web前端高级技术基础大作业相关功能'
    },{
        title:'完成Web前端高级技术基础大作业实验报告'
    }],
    searchString: '',
};
var demo = new Vue({
    el: '#app',
    data: data,
    computed: {
        // 只保存与搜索字符串匹配的项目
        filteredTodo: function () {
            var todos_array = this.todos,
                searchString = this.searchString;
            if(!searchString){
                return todos_array;
            }
            //去除两边空格，并将字符串全部换成小写
            searchString = searchString.trim().toLowerCase();
            todos_array = todos_array.filter(function(item){
                //indexOf() 返回某个指定的字符在某个字符串中首次出现的位置。如果没有找到就返回-1；
                if(item.title.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
            })
            // 返回带有筛选数据的数组
            return todos_array;;
        }
    }
});