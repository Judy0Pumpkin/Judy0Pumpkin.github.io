

<template>
         
    <div>
    
       
        <div class="endBox">


            <div class=" box">
                <div class="item1">
            
                <a  href= "https:www.instagram.com/" target="_blank" >
                    <v-icon
                    size="large"
                    color="white"
                    icon="mdi-instagram"
                    ></v-icon>
                </a>

                <a  href= "https://www.facebook.com/" target="_blank" >
                    <v-icon
                    size="large"
                    color="white"
                    icon="mdi-facebook"
                    ></v-icon>
                </a>

                <a  href= "https://github.com/FRC7636Robomania" target="_blank" >
                    <v-icon
                    size="large"
                    color="white"
                    icon="mdi-github"
                    ></v-icon>
                </a>
            


            <a  href= "https://frc7636robomania.github.io/FRC7636/home" target="_blank" >
                <v-icon
                size="large"
                color="white"
                icon="mdi-unicorn"
                ></v-icon>
            </a>

            </div>
        </div>
     



        <div class="item3">
       

         
        </div>
        </div>

     
    </div>
</template>


<script>

    export default {
        data:()=>({
            icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
            

        }),

         methods:{ 
         
            
        },
        message:{
        },

        component:{
        },
    }

    
</script>


<style lang="css" scoped>

.item1 { 
    display: flex;
    position: relative;
    justify-content: space-between;

}
.item2 { grid-area: menu; }
.item3 { grid-area: main; }
.item4 { grid-area: footer; }
.endBox{
    width :100vw;
    height : 300px;
    background-color:#031f5b;
    display:flex;
    

    gap: 10px;
    padding-top: 150px;
    justify-content:center;
    z-index: 110;
    justify-self: center;
    position: absolute;

}
 
.box{

    width: 30vw;
    height: 10px;
    display: baseline;
    justify-items: center ;
    justify-content: center;
   
} 
</style>
