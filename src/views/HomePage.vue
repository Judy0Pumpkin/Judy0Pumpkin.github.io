<template>

<Header>
</Header>





    <div class="shortPage">

      
    </div>
    <div class="shortPage">
    <h1>{{ project }}</h1>
    <div v-if="items[0] !=''">
      
        <v-menu  transition="scale-transition">
                <template v-slot:activator="{ props }">
               
                    <v-btn icon color="white"  v-bind="props" density="comfortable" > <v-icon>mdi-menu</v-icon></v-btn>
                </template>

                <v-list>
                    <v-list-item 
                    v-for="(item, index) in items"
                    @click="onClick(item) "
                    :key="index"
                    >
                      
                    <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
               
    </div>
    </div>
    <div id="d1"> </div>
    <div class="shorterPage1">

      
    </div>

    <!-- <h2> {{ slider }}  </h2> -->
      <div class="page">
      
        <div v-if=" note1 != ''">

        <ProgressCard
          :group= "note1"
          @group="(gr)=>note1= gr"
          :progress= "progress"
          @update="(val)=>progress= val"
          
        >
        </ProgressCard>
      </div>

      <div v-if="note2 !=''">
        <ProgressCard
          :group= "note2"
          :progress= "progress"
          @update="(val)=>progress= val">
        </ProgressCard>
      </div>


        <div v-if="note3 != ''">
        <ProgressCard
          :group= "note3"
          :progress= "progress"
          @update="(val)=>progress= val">
        
        </ProgressCard>
      </div>
        

    </div>

</template>


<script>
 import Header from '@/components/Header.vue'
 import ProgressCard from '@/components/ProgressCard.vue'
 import Footer from '@/components/endBox.vue'
import { getProgressSlider, getUserNotes,auth,getUserProjects } from '@/plugins/fireBase'


  export default {
 
    props:{
      
    },
    data:()=>({  
      progress:10,
      note1:"",
      note2:"",
      note3:"",
      slider:auth.currentUser.uid,
      items: [],
      CurrentNote: "Choose Project",
      project:"",
     
    }),
    methods:{
     
            onClick(item){
              this.project=item;
              getUserNotes(item).then((noteArr)=>{
                this.note1=noteArr[0];
                this.note2=noteArr[1];
                this.note3=noteArr[2];
            
            })
            .catch((errorMessage)=>{
                console.log(errorMessage);

            })
                
            }

          
     },

  created(){

    location.replace('#d1');
    // console.log(this.slider);

      
   

     getUserProjects().then((projects)=>{
      
      this.onClick(projects[projects.length-1]);

      for( let i=0; i<projects.length; i++){
        this.items.push(projects[i]);
  
        console.log(this.items[i]+"pushed"+i);
        
      }
        


    
    })
    .catch((errorMessage)=>{
        console.log(errorMessage);

    })

     
   
    },
    message:{
    },

    components:{
      ProgressCard,
     
    },
  }
</script>


<style lang="css" scoped>

.wholePage{
  width: 100vw;
    height:1200px;
    position: relative;
    display:flex;
    align-content: space-around;
    justify-content: space-around;
   
}
.page{
  width: 100vw;
    height:1200px;
    position: relative;
    display:flex;
    align-content: space-around;
    justify-content: space-around;

}
.shortPage{
   
    width: 100vw;
    height:100px;
    position: relative;
    display:flex;
    align-content:flex-start;
    justify-content: left;

}

.shortPage1{
   
   width: 100vw;
   height:100px;
   position: relative;
   display:flex;
   align-content: flex-start;
   justify-content: center;

}

.shorterPage{
   
   width: 100vw;
   height:50px;
   position: relative;
   display:inline;
   align-content: left;
   justify-content: center;
}

v-btn--variant-elevated {
  box-shadow: hotpink
  }


</style>






<!-- <template>
    <Header/>
    <HomePage/>
    
  </template>
  
  <script setup>
   
    import HomePage from '@/components/HomePage.vue'
    import Header from '@/components/Header.vue';
  </script>
   -->