import Vue from 'vue'

Vue.directive("drag",{
   inserted(el,binding){
       if(!binding.value){
         return;
       }
       let itemArr=[];
       let boxContent=$("#"+el.id);
       let itemArrBox=boxContent.find(".drag-item"); 
       let animTuff=true;
      
       dragInitFun();
       /**
        * 获得拖拽元素容器
        * @return {[type]} [description]
        */
       function dragInitFun(){   
           itemArrBox.each((ind)=>{
             itemArr.push(itemArrBox.eq(ind));
             dragRunFun(itemArrBox.eq(ind),ind);
           })
           setNumFun();
           setDatNum();
       }
       /**
        * [设置编号]
        */
       function setNumFun(){  
         let objBox=boxContent.find(".drag-item"); 
         objBox.each((ind)=>{
            objBox.eq(ind).attr("index-num",ind);
         })  
       }
       function setDatNum(){
          itemArrBox.each((ind)=>{
            itemArrBox.eq(ind).attr("data-num",ind);
          })
       }
       function callBackFun(){
         let numDatArr=[];
         let objBox=boxContent.find(".drag-item");
         objBox.each((ind)=>{
            let num=objBox.eq(ind).attr("data-num");
            numDatArr.push(num);
         })
          console.log(numDatArr); 
       }
       /**
        * 拖拽事件处理
        * @param  {[type]} item [拖拽元素]
        * @param  {[type]} ind  [拖拽元素编号]
        * @return {[type]}      [description]
        */
       function dragRunFun(item,ind){  
           let xPos,yPos,lef,top,itemcopy,valX,valY,maxX,maxY,targetObj;
           let draging=false;
           let itemW=item.width();
           let itemH=item.height();
           item.on("mousedown",(event)=>{
               let evt=event.originalEvent;
               xPos=evt.pageX;
               yPos=evt.pageY;
               lef=item.position().left;
               top=item.position().top;
               itemcopy=item.clone(true);
               itemcopy.attr("index-num",item.attr("index-num"));
               itemcopy.css({"position":"absolute"});
               itemcopy.css({"top":top,"left":lef});
               boxContent.append(itemcopy);
               draging=true;
               event.preventDefault();
               
               $(document).on("mousemove",(event)=>{
                 if(draging){
                    let evt=event.originalEvent;
                    let diffX=evt.pageX-xPos;
                    let diffY=evt.pageY-yPos;
                    valX=lef+diffX;
                    valY=top+diffY;
                    //maxX=$(window).width()-itemW;
                    maxY=boxContent.height()-itemH;
                    valY = Math.min(Math.max(0,valY),maxY);
                    $(itemcopy).css({"left":valX,"top":valY}); 
                    setNumFun(); 
                    itemArr.forEach((obj,key)=>{
                      if(crashTest(itemcopy,obj)){
                         obj.addClass("drag-set");
                         targetObj=obj;
                         itemcopy.attr("index-num",obj.attr("index-num"));
                         itemSetFun(item,obj);
                      }else{
                         obj.removeClass("drag-set");
                         // targetObj=null;
                      }
                    })
                 }
                 event.preventDefault();  
              })
              $(document).on("mouseup",()=>{
                  if(draging){
                    itemArr.forEach((obj,key)=>{
                      obj.removeClass("drag-set");
                    })  
                  } 
                  setNumFun();
                  item.on("mousedown",null);
                  $(document).on("mousemove",null);
                  if(targetObj&&animTuff){
                    //animTuff=false;
                    animFun(targetObj,itemcopy);
                  }
                  draging=false; 
              })  
 
           })
       }
       function animFun(obj1,obj2){
          console.log(111);
          let targetTop=obj1.position().top;
          let targetLeft=obj1.position().left;
          obj2.animate({top:targetTop,left:targetLeft},300,function(){
             $(obj2).remove();
             animTuff=true;
             callBackFun();
          })
       }
       /**
        * [posSetFun description]
        * @param  {[type]} obj1     [拖拽元素]
        * @param  {[type]} obj2     [目标元素]
        * @param  {[type]} ind      [拖拽元素编号]
        */
       function itemSetFun(obj1,obj2){  
          let num=obj2.attr("index-num");
          let ind=obj1.attr("index-num");
          if(ind<num){
            obj2.after(obj1[0]);
          }else{
            obj2.before(obj1[0]);
          }  
       }
       /**
        * 碰撞检测
        * @param  {[type]} obj1 [调整对象]
        * @param  {[type]} obj2 [列表对象]
        * @return {[type]}      [description]
        */
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
