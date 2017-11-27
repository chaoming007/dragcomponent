<template>
  <div>
     <div class="drag-box" id="dragBox">
       


     </div>
 
  </div>
</template>

<script>
export default {
  data () {
    return {
       dragDat:[
          {
            "tit":"标题1",
            "content":"内容1"
          },
           {
            "tit":"标题2",
            "content":"内容2"
          },
           {
            "tit":"标题3",
            "content":"内容3"
          },
          {
            "tit":"标题4",
            "content":"内容4"
          }
       ],
       itemArr:[],
       boxContent:""
    }
  },
  methods:{
    boxCreateFun(){
        this.boxContent=$("#dragBox");
        this.dragDat.forEach((item,key)=>{
           let str=$("<div class='drag-item'><div class='drag-item-tit'>"+item.tit+"<div><div class='drag-item-content'>"+item.content+"</div></div>");
           this.itemArr.push(str);
        })
        this.itemArr.forEach((item)=>{
           this.boxContent.append(item);
        })
        this.boxContent.find(".drag-item").each(function(ind){
            let $h=$(this).height();
            $(this).css({"left":0,"top":$h*ind});
        })
        this.dragInitFun();
    },
    dragInitFun(){
        this.itemArr.forEach((item,ind)=>{
           this.dragRunFun(item,ind);
        })
    },
    dragRunFun(item,ind){
        let draging;
        let xPos,yPos,lef,top,item1;
        item.on("mousedown",(event)=>{
            let evt=event.originalEvent;
            xPos=evt.pageX;
            yPos=evt.pageY;
            item1=item.clone(true);
            this.boxContent.append(item1);
            lef=parseInt(item1.css("left"));
            top=parseInt(item1.css("top"));
            draging=true;
        })
        $(document).on("mousemove",(event)=>{
          if(draging){
             let evt=event.originalEvent;
             let diffX=evt.pageX-xPos;
             let diffY=evt.pageY-yPos;
             $(item1).css({"left":lef+diffX+"px","top":top+diffY+"px"});  
          }  
       })
       $(document).mouseup(()=>{
           $(item1).remove();
           draging=false;
       })
        
    }

  },
  mounted(){
    this.boxCreateFun();
  }
}
</script>


