import Vue from 'vue'

Vue.directive("drag",{
   inserted(el,binding){
       if(!binding.value){
         return;
       }
       let itemArr=[];
       let boxContent=$("#"+el.id);
       dragInitFun();
       function dragInitFun(){
           let objArr=boxContent.find(".drag-item");      
           objArr.each((ind)=>{
             itemArr.push(objArr.eq(ind));
             dragRunFun(objArr.eq(ind),ind);
           })
       }
       function dragRunFun(item,ind){  
           let draging;
           let xPos,yPos,lef,top,itemcopy,valX,valY,maxX,maxY;
           let itemW=item.width();
           let itemH=item.height();
           item.on("mousedown",(event)=>{
               let evt=event.originalEvent;
               xPos=evt.pageX;
               yPos=evt.pageY;
               lef=item.position().left;
               top=item.position().top;
               itemcopy=item.clone(true);
               itemcopy.addClass("drag-pos");
               itemcopy.css({"top":top,"left":lef});
               boxContent.append(itemcopy);
               draging=true;
               event.preventDefault();
           })
           $(document).on("mousemove",(event)=>{
             if(draging){
                let evt=event.originalEvent;
                let diffX=evt.pageX-xPos;
                let diffY=evt.pageY-yPos;
                valX=lef+diffX;
                valY=top+diffY;
                maxX=$(window).width()-itemW;
                maxY=boxContent.height()-itemH;
                valX = 0;
                valY = Math.min(Math.max(0,valY),maxY);
                $(itemcopy).css({"left":valX,"top":valY});  
                itemArr.forEach((obj,key)=>{
                    if(crashTest($(itemcopy),obj)){
                       obj.addClass("drag-set");
                    }else{
                       obj.removeClass("drag-set");
                    }
                })
             }
             event.preventDefault();  
          })
          $(document).on("mouseup",()=>{
              if(draging){
                itemArr.forEach((obj,key)=>{
                    obj.removeClass("drag-set");
                    if(crashTest($(itemcopy),obj)){
                       posSetFun(item,obj,ind,key,$(itemcopy));
                    }
                })
              } 
              item.on("mousedown",null);
              $(document).on("mousemove",null);
              $(itemcopy).remove();
              draging=false; 
          })  
       }
       function posSetFun(obj1,obj2,ind,key,itemcopy){  //调整完之后
          obj2.after(obj1[0]);
          itemcopy.remove();
       }
       function crashTest(obj1,obj2){
          let t1=obj1.position().top;
          let t2=obj2.position().top;
          let h1=obj1.height();
          let h2=obj2.height();
          if(Math.abs(t1-t2)<h2/2 && Math.abs(t1-t2)>0){
            return true;
          }
          return false;
       }

  }    
  
})
