<template>
  <div>
     <div class="drag-box" id="dragBox" v-drag="dat">
          <div class="drag-item">
             <div class="drag-item-tit">标题1</div>
             <div class="drag-item-content">内容1</div>
          </div>
          <div class="drag-item">
             <div class="drag-item-tit">标题2</div>
             <div class="drag-item-content">内容2</div>
          </div>
          <div class="drag-item">
             <div class="drag-item-tit">标题3</div>
             <div class="drag-item-content">内容3</div>
          </div>
          <div class="drag-item">
             <div class="drag-item-tit">标题4</div>
             <div class="drag-item-content">内容4</div>
          </div>
          <div class="drag-item">
             <div class="drag-item-tit">标题5</div>
             <div class="drag-item-content">内容5</div>
          </div>
        
     </div>
 
  </div>
</template>

<script>
import  './direct.js'

export default {
  data () {
    return {
       dat:{
          tuff:true,
          callBackGetDat:this.getDat
       }
    }
  },
  methods:{
      getDat(dat){
         if(dat){
           console.log("排序后的顺序：",dat);
         }
      }
  },
  mounted(){
     this.getDat();
  }

}
</script>
