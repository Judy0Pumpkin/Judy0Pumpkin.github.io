<template>
    <div>
       <div class="box">



    <v-form validate-on="submit lazy" @submit.prevent="submit">

      <h1>Create Your Project Here!</h1>
  <h3>You can create up to 3 group per project and 3 division per group. Leave the blank empty if you don't want as many group/division.
    <br/>
    <br/>
  
  </h3>
      <v-text-field
        v-model="projectName"
        :rules="rules"
        label="Project Name"
        style="width:90vw"
        
      ></v-text-field>
      <h2>Group 1</h2>
      <v-text-field
        v-model="group1"
        :rules="rules"
        label="Group Name"
        style="width:90vw"
        
      ></v-text-field>
       
      <v-row 
        justify="space-between"
        
        style="width:90vw"
        >
          <v-col cols="12" sm="4" align-self="end">
            <v-text-field
            v-model="group1_1"
            :rules="rules"
            label="Group Division 1"
            style="max-width:90vw"   
            
            ></v-text-field>
            </v-col>

          <v-col cols="12" sm="4" align-self="end">
            <v-text-field
            v-model="group1_2"
            :rules="rules"
            label="Group Division 2"
            style="max-width:90vw"   
            
            ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" align-content="end">
           
            <v-text-field
            v-model="group1_3"
            :rules="rules"
            label="Group Division 3"
            style="max-width:90vw"   
            ></v-text-field>
          </v-col>
       </v-row>

        <h2>Group 2</h2>
      <v-text-field
        v-model="group2"
        :rules="rules"
        label="Group Name"
        style="width:90vw"
        
      ></v-text-field>
       
        <v-row 
        justify="space-between"
        
        style="width:90vw"
        >
          <v-col cols="12" sm="4" align-self="end">
            <v-text-field
            v-model="group2_1"
            :rules="rules"
            label="Group Division 1"
            style="max-width:90vw"   
            
            ></v-text-field>
            </v-col>

          <v-col cols="12" sm="4" align-self="end">
            <v-text-field
            v-model="group2_2"
            :rules="rules"
            label="Group Division 2"
            style="max-width:90vw"   
            
            ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" align-content="end">
           
            <v-text-field
            v-model="group2_3"
            :rules="rules"
            label="Group Division 3"
            style="max-width:90vw"   
            ></v-text-field>
          
            </v-col>
          </v-row>
     

          <h2>Group 3</h2>
      <v-text-field
        v-model="group3"
        :rules="rules"
        label="Group Name"
        style="width:90vw"
        
      ></v-text-field>
       
        <v-row 
        justify="space-between"
        
        style="width:90vw"
        >
          <v-col cols="12" sm="4" align-self="end">
            <v-text-field
            v-model="group3_1"
            :rules="rules"
            label="Group Division 1"
            style="max-width:90vw"   
            
            ></v-text-field>
            </v-col>

          <v-col cols="12" sm="4" align-self="end">
            <v-text-field
            v-model="group3_2"
            :rules="rules"
            label="Group Division 2"
            style="max-width:90vw"   
            
            ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" align-content="end">
           
            <v-text-field
            v-model="group3_3"
            :rules="rules"
            label="Group Division 3"
            style="max-width:90vw"
            ></v-text-field>
          
            </v-col>
          </v-row>
     
      <h1><br/><br/></h1>
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            persistent
            width="auto"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                color="#031f5b"
                v-bind="props"
                class="mt-2"
                variant ="elevated"
                min-width="190px"
              >
                Sumbit
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to create a new project?
              </v-card-title>
              <v-card-text>Unicorn Notebook is designed to safeguard your projects and notes indefinitely. To ensure the security of your data, project deletions can be requested only by reaching out to our website builder via email.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="#809bce"
                  variant="text"
                  @click="dialog = false"
                >
                  Disagree
                </v-btn>
                <v-btn
                  color="#F0C5C4"
                  variant="text"
                  @click="submit"
                  
                >
                  Agree
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      


      <h1><br/><br/></h1>
    </v-form>




       </div>
    </div>
</template>


<script>

import { setNewProject} from '@/plugins/fireBase';
    export default {
      
        data(){
          return{

          projectName:"",
          group1:"",
          group1_1:"",
          group1_2:"",
          group1_3:"",

          group2:"",
          group2_1:"",
          group2_2:"",
          group2_3:"",

          group3:"",
          group3_1:"",
          group3_2:"",
          group3_3:"",

          dialog:false,
          }
          

        },

        message:{
        },

        component:{
        },
        methods:{

          async  submit(){

            console.log("in the submit function")
            setNewProject(this.projectName,this.group1,this.group1_1,this.group1_2, this.group1_3, this.group2, this.group2_1, this.group2_2, this.group2_3 ,this.group3, this.group3_1, this.group3_2, this.group3_3)
            .then(()=>{
            })
            .catch(()=>{


            })
            this.$router.push('/added-new-project');
            setTimeout(() => {
                    this.$router.push('/homepage');
                    }, 1500);

          },

        

        }
    }
</script>


<style lang="css" scoped>
.box{

    padding-top: 150px;
    height: auto;
    width: 100vw;
    display: flex;
    position:relative;
    justify-content: center;
    align-content:center;
}
.v-col-xxl, .v-col-xxl-auto, .v-col-xxl-12, .v-col-xxl-11, .v-col-xxl-10, .v-col-xxl-9, .v-col-xxl-8, .v-col-xxl-7, .v-col-xxl-6, .v-col-xxl-5, .v-col-xxl-4, .v-col-xxl-3, .v-col-xxl-2, .v-col-xxl-1, .v-col-xl, .v-col-xl-auto, .v-col-xl-12, .v-col-xl-11, .v-col-xl-10, .v-col-xl-9, .v-col-xl-8, .v-col-xl-7, .v-col-xl-6, .v-col-xl-5, .v-col-xl-4, .v-col-xl-3, .v-col-xl-2, .v-col-xl-1, .v-col-lg, .v-col-lg-auto, .v-col-lg-12, .v-col-lg-11, .v-col-lg-10, .v-col-lg-9, .v-col-lg-8, .v-col-lg-7, .v-col-lg-6, .v-col-lg-5, .v-col-lg-4, .v-col-lg-3, .v-col-lg-2, .v-col-lg-1, .v-col-md, .v-col-md-auto, .v-col-md-12, .v-col-md-11, .v-col-md-10, .v-col-md-9, .v-col-md-8, .v-col-md-7, .v-col-md-6, .v-col-md-5, .v-col-md-4, .v-col-md-3, .v-col-md-2, .v-col-md-1, .v-col-sm, .v-col-sm-auto, .v-col-sm-12, .v-col-sm-11, .v-col-sm-10, .v-col-sm-9, .v-col-sm-8, .v-col-sm-7, .v-col-sm-6, .v-col-sm-5, .v-col-sm-4, .v-col-sm-3, .v-col-sm-2, .v-col-sm-1, .v-col, .v-col-auto, .v-col-12, .v-col-11, .v-col-10, .v-col-9, .v-col-8, .v-col-7, .v-col-6, .v-col-5, .v-col-4, .v-col-3, .v-col-2, .v-col-1 {

width: 100%;
}
.formRoll{
    height:120px;
    width:100vw;
    display:list-item;
    justify-content: left;
}

button, [type=button], [type=reset], [type=submit], [role=button] {
    cursor: pointer;
    color: white;
}


</style>
