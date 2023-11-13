<template>

    

    <div class="page">

        <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
        zIndex="-10000"
      >


      <div class="small-spacing-blok">

      </div>
        <v-list-item
        
                    v-for="(item, index) in items"
                    @click="onClick(item) "
                    
                    :key="index"
                    
          :title= "item"
          src='@/assets/logo.png'
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>
        
        

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <div v-if ="note1 != '' ">
                <v-list-item prepend-icon="mdi-book-open" :title="note1" :value="note1" @click="subGroupNote(note1)"></v-list-item>
            </div>

            <div v-if ="note2 != '' ">
                <v-list-item prepend-icon="mdi-book-open" :title="note2" :value="note2" @click="subGroupNote(note2)"></v-list-item>
            </div>

            <div v-if ="note3 != '' ">
                <v-list-item prepend-icon="mdi-book-open" :title="note3" :value="note3" @click="subGroupNote(note3)"></v-list-item>
            </div>
            
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>





   

    <div v-if = "groupBool == false ">
        <div class="container mt-3">
            <table class="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Group</th>
                        <th>Member</th>
                        <th>Photo</th>
                        <th>Progress</th>
                        <th>Problem</th>
                        <th>Plan</th>
                    </tr>
                </thead>
                
                <tbody><tr
                    v-for="note in notes"
                    :key="note.group"
                >
                    <td>{{ note.date }}</td>
                    <td>{{ note.group }}</td>
                    <td>{{ note.member }}</td>
                    <td><v-img
                            :width="200"
                            aspect-ratio="16/9"
                            cover
                            :src=note.image
                            ></v-img></td>
                    <td>{{ note.progress }}</td>
                    <td>{{ note.problem }}</td>
                    <td>{{ note.plan }}</td>
                </tr></tbody>
            </table>  
        </div> 
    </div>

    <div v-if = "groupBool == true ">
        <div class="container mt-3">
            <table class="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Group Devision</th>
                        <th>Photo</th>
                        <th>Progress</th>
                        <th>Problem</th>
                        <th>Plan</th>
                    </tr>
                </thead>
                
                <tbody><tr
                    v-for="note in notes"
                    :key="note.group"
                >
                    <td>{{ note.date }}</td>
                    <td>{{ note.subGroup }}</td>
                    <td><v-img
                            :width="200"
                            aspect-ratio="16/9"
                            cover
                            :src=note.image
                            ></v-img></td>
                    <td>{{ note.progress }}</td>
                    <td>{{ note.problem }}</td>
                    <td>{{ note.plan }}</td>
                </tr></tbody>
            </table>  
        </div> 
    </div>
    </div>
</template>


<script>
import {getGroupPastNote, auth, getUserNotes, getUserProjects, getGroupDivisionPastNote } from '@/plugins/fireBase';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';

    export default {
      
        data:()=>({
            notes:[],
            note1:"",
            note2:"",
            note3:"",
            slider:auth.currentUser.uid,
            items: [],
            CurrentNote: "Choose Project",
            drawer: true,
            rail: true,
            project: "Pick a Project",
            groupBool:false,

        }),

        message:{
        },
        methods:{
            onClick(item){
                this.groupBool=false;
              this.project=item;
              
              getUserNotes(item).then((noteArr)=>{
                this.note1=noteArr[0];
                this.note2=noteArr[1];
                this.note3=noteArr[2];

                getGroupPastNote(item, this.notes)
                .then(()=>{
               
                console.log ("here's the note arr " + this.notes[0].group);
                
                })

                .catch((error)=>{
                    
                    console.log(error);
                })
      

            
            })
            .catch((errorMessage)=>{
                console.log(errorMessage);

            })
                
            },

            subGroupNote(subGroup){
                this.groupBool=true;

                getGroupDivisionPastNote( this.project, subGroup, this.notes)
                .then(()=>{

                })
                .catch((e)=>{
                    console.log(e);


                })
            }

            

        },

        component:{
        },
        created(){
            getGroupPastNote(this.project, this.notes)
            .then(()=>{
               
                console.log ("here's the note arr " + this.notes[0].group);
                
            })

            .catch((error)=>{
                
                console.log(error);
            })
      

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


        }
    }
</script>


<style lang="css" scoped>

.page{
    padding-top:120px;
    width: 100vw;
    min-height: 100vh;
    height:auto;
    display: flex;
    background-color: white;
    z-index: -2;
}

table, th, td {
  border: 4px dashed rgb(147, 208, 245);
  border-collapse: collapse;
  border-color: pink;
  
}

.v-card{
    z-index: 0
}

.small-spacing-blok{
    height: 120px;
    width: 120px;
   
    padding-top: 100px;
}
 
</style>
