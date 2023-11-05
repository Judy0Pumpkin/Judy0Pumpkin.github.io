
<template>
    <div class="page">
        <div class="boxNotes">
       
          <v-form
            @submit.prevent="pressSubmit"
           
          >
              <v-select
              label="Choose Project"
              :items= projectItems
              :rules=required
              v-model= project
              required 
              @update:model-value="projectFunction"
             
              ></v-select>

              <v-select
              
              label="Choose Group"
              :items= items
              :rules=required
              v-model= selected
              required 
              @update:model-value="updateGroupDivision(selected)"
               
              ></v-select>


              <v-select
              
              label="Choose Group Devision"
              :items= groupDevision
              
              v-model= chosen
              required 
              @update:model-value="updateSLider(chosen)"
               
              ></v-select>





              <v-img

              :width="300"
               
                :src="imageComputer"

              ></v-img>
              
              <v-file-input
                  chips
                  multiple
                  label="File input w/ chips"
                  accept="image/*"
                  v-model="file"
                  @update:model-value="onImageSelected"
                   

              ></v-file-input>

              
              <!-- <h4>Date:
              <input type="datetime-local" id="Test_DatetimeLocal">
          </h4>
              -->
           
               <!-- @blur="date = parseDate(dateFormatted)" -->
                  <v-text-field
                    v-model="date"
                    label="Date"
                    hint="YYYY-MM-DD format"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                 
                    :rules="dateRules"

                  
                  ></v-text-field>
               

                  
              
                  

      
            <v-text-field
              v-model="Members"
              label="Members"
              :rules="required"
            ></v-text-field>

              
      
              
              
          <div class="text-caption">Degree of Completion</div>

          <div class="shortPage"> 

            <v-slider v-model="slider1" thumb-label

              color= #95b8d1
              track-color=#eac4d5
              max-width="290px"
                  min-width="80w"
                  :rules="required"

              >
              <template v-slot:append>
              <v-text-field
                v-model="slider1"
                hide-details
                single-line
                density="compact"
                type="number"
                style="width: 70px"
              ></v-text-field>
            </template>
            
            </v-slider>

            
          </div>
          

          <!-- <h2> Progress</h2> -->
          <v-textarea label="Today's Progress"
          
          v-model="progress" 
          :rules="required"></v-textarea>
          <!-- <h2> Problem Faced</h2> -->
          <v-textarea label="Problem Faced"
          
          v-model="problem"
          :rules="required"></v-textarea>

          <v-textarea label="Plan for Tomorrow"
          
          v-model="plan"
          :rules="required"></v-textarea>
          <v-btn
          :loading="loading"
          type="submit"
          block
          class="mt-2"
          text="Submit"
        ></v-btn>
        
        </v-form>  

        
    </div>
    
    
    </div>


   
       
</template>


<script>

import { auth, uploadImage,getUserNotes, getUserProjects,getSlider, getProgressSlider,getGroupDivision } from '@/plugins/fireBase.js';

import { uploadText } from '@/plugins/fireBase.js';
import addNewPhoto from '@/assets/addNewPhoto.png'
import { connectStorageEmulator } from 'firebase/storage';


    export default {
    
  
    data: vm => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      // dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      project: "",
      items : [],
      groupDevision:[],
      projectItems:[],
      selected : "",
      chosen:"",
        file : [],
        Members: '',
        slider1: 0,
        progress: "",
        problem: "",
        plan: "",
        loading: false,
        previewUrl:"",
        test: auth.currentUser,
        imgBool: "0",
        dateRules:[

        (date) => {

          console.log(date);
          let rule= /\d\d\d\d-\d\d-\d\d/;
          if(!rule.test(date)){
            return "please follow the YYYY-MM-DD rule";

          }

          else return true;

        },
         

          (date) => {
            let [y, m, d] = date.split("-");
            let input = new Date(y, m - 1, d);
            let today = new Date ;
            console.log(input)
            if (today.getTime() - input.getTime()>86400000*100)
            return "Too old date";
        
            let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
                console.log(tomorrow);
            if(input.getTime() >= tomorrow.getTime()) {
              return "You cannot travel to the future" ;
            }
            return true;

          }
        ],

        required: [
        value => {
          if (value) return true

          return 'This field must be filled'
        },
      ],

        
      rules: [value => vm.checkApi(value)],
      timeout: null,
      url:'',
    }),
    
    created(){
     
      
            
            getUserProjects().then((projects)=>{
          
            for( let i=0; i<projects.length; i++){
              this.projectItems[i]=(projects[i]);
              console.log(this.projectItems[i]+"pushed");
            }
              
              console.log("items is "+this.items[0]);
            })
                

    },

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      
      imageComputer(){
        if(this.previewUrl=="") return addNewPhoto;

        else return this.previewUrl;

      }
    },

    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },

    methods: {

      updateGroupDivision(selected){
        getGroupDivision(selected, this.project)
        .then((arr)=>{
          for ( let i=0; i< 3; i++){
            if(arr[i]!=""){
              this.groupDevision.push( arr[i]);
            }
          }

        })


      },

      updateSLider(selected){
        console.log(selected+"slider");
        getProgressSlider(selected)
        .then((sliderValue) => {
          this.slider1 = sliderValue;  // Set the slider value once it's retrieved
        })
        .catch((error) => {
          console.error("Error getting slider value: ", error);
        });
        
      },

      projectFunction(){
        getUserNotes( this.project).then((noteArr)=>{
               for(let i=0; i<noteArr.length; i++){
              if (noteArr[i]!="")
                this.items[i]=(noteArr[i]);
               }
            
            })
            .catch((errorMessage)=>{
                console.log(errorMessage);

            })
          },
      onImageSelected(file){
        if (file[0]==null){
          this.previewUrl= "";
        }

        else{
          this.previewUrl = URL.createObjectURL(file[0]);
        }

      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },

      async submit() {

    

      
            window.alert("onePic");

            uploadImage(this.file[0])
                .then((downloadURL) => {
                  console.log(downloadURL);
                  
                  this.url =downloadURL;
                  console.log("pic");
                  uploadText(this.project, this.selected, this.date, this.url, this.Members, this.slider1, this.progress, this.problem, this.plan, this.imgBool, this.chosen);
                  this.$router.push('/submitted');
                  

                    setTimeout(() => {
                    this.$router.push('/homepage');
                    }, 1500);


                
                })
                // 失敗的行為一律交給了 catch
                .catch((state) => {
                this.url = state

                });
          

          },

 pressSubmit(){

          if(this.selected!=""&& this.dataFormatted!="" && this.Members!="" && this.slider1!=""&& this.progress!=""&& this.problem!=""&& this.plan!=""){

        

          if(this.file.length==1){
            this.imgBool="1";
            this.submit();
            console.log("finish differentiating imgBool");
          }
          else{
            this.imgBool="0";
            uploadText(this.project,this.selected, this.date, "noImg", this.Members, this.slider1, this.progress, this.problem, this.plan, this.imgBool, this.chosen);
                  this.$router.push('/submitted');
                    setTimeout(() => {
                    this.$router.push('/homepage');
                    }, 1500);
          }
        }  

      },
      async checkApi(userName) {
        return new Promise(resolve => {
          clearTimeout(this.timeout)

          this.timeout = setTimeout(() => {
            if (!userName) return resolve('Please enter a user name.')
            if (userName === 'johnleider')
              return resolve('User name already taken. Please try another one.')

            return resolve(true)
          }, 1000)
        })
      },

      },
      

        message:{
        },

        components:{ 
          
        },
    }
</script>


<style lang="scss" scoped>
 .page{
position: relative;
margin-top: 120px;
margin-bottom: 100px;
 height: 1600px;
 width: 100vw;
 display: flex;
 justify-content: center;

}


.boxNotes{
    width: 90vw;
    height: 1200px;
    background-color:white;
}

input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}
.v-col-xxl, .v-col-xxl-auto, .v-col-xxl-12, .v-col-xxl-11, .v-col-xxl-10, .v-col-xxl-9, .v-col-xxl-8, .v-col-xxl-7, .v-col-xxl-6, .v-col-xxl-5, .v-col-xxl-4, .v-col-xxl-3, .v-col-xxl-2, .v-col-xxl-1, .v-col-xl, .v-col-xl-auto, .v-col-xl-12, .v-col-xl-11, .v-col-xl-10, .v-col-xl-9, .v-col-xl-8, .v-col-xl-7, .v-col-xl-6, .v-col-xl-5, .v-col-xl-4, .v-col-xl-3, .v-col-xl-2, .v-col-xl-1, .v-col-lg, .v-col-lg-auto, .v-col-lg-12, .v-col-lg-11, .v-col-lg-10, .v-col-lg-9, .v-col-lg-8, .v-col-lg-7, .v-col-lg-6, .v-col-lg-5, .v-col-lg-4, .v-col-lg-3, .v-col-lg-2, .v-col-lg-1, .v-col-md, .v-col-md-auto, .v-col-md-12, .v-col-md-11, .v-col-md-10, .v-col-md-9, .v-col-md-8, .v-col-md-7, .v-col-md-6, .v-col-md-5, .v-col-md-4, .v-col-md-3, .v-col-md-2, .v-col-md-1, .v-col-sm, .v-col-sm-auto, .v-col-sm-12, .v-col-sm-11, .v-col-sm-10, .v-col-sm-9, .v-col-sm-8, .v-col-sm-7, .v-col-sm-6, .v-col-sm-5, .v-col-sm-4, .v-col-sm-3, .v-col-sm-2, .v-col-sm-1, .v-col, .v-col-auto, .v-col-12, .v-col-11, .v-col-10, .v-col-9, .v-col-8, .v-col-7, .v-col-6, .v-col-5, .v-col-4, .v-col-3, .v-col-2, .v-col-1 {
padding: 0px;
width: 100%;
}

::v-deep .v-label {
  font-size: 1.2em
}

.shortPage{
  display:inline;
  height:auto;
  width: inherit
}



</style>
