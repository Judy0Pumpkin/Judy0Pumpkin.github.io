// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, setDoc,addDoc, query, where, getDocs,orderBy } from "firebase/firestore";
import { getAuth,setPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword,browserLocalPersistence } from "firebase/auth";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmgkAETyShZFXkLJyuHY73AC_kDTUHOO4",
  authDomain: "unicorn-notebook.firebaseapp.com",
  projectId: "unicorn-notebook",
  storageBucket: "unicorn-notebook.appspot.com",
  messagingSenderId: "1072055798292",
  appId: "1:1072055798292:web:0208f563e34845bf493501",
  measurementId: "G-DE53B6VLGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




const analytics = getAnalytics(app);

const db = getFirestore(app);

Date.getDateString = function() {
    let date = new Date();
    return String(date.getFullYear()) + "_" + String(date.getMonth() + 1).padStart(2, '0') + "_" + String(date.getDate()).padStart(2, '0');
}






import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//import { reject } from "core-js/fn/promise";
// import { resolve } from "core-js/fn/promise";

const storage = getStorage();

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'

async function uploadImage(file){

  return new Promise ( (happy, reject)=>{ 
    // Create a reference to 'mountains.jpg'
    const pictureRef = ref(storage, Date.getDateString()); //照片的資料夾
  
    // Create a reference to 'images/mountains.jpg'
    const pictureImagesRef = ref(pictureRef, Date.now()+'jpg'); //照片本人

    const uploadTask = uploadBytesResumable(pictureImagesRef, file, metadata);
  
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
  
        let state ='';
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            state = 'unauthorized';
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            state= 'canceled'
            // User canceled the upload
            break;
  
          // ...
  
          case 'storage/unknown':
            state= "unknown";
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
  
        reject (state);
  
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((  downloadURL) => {
         happy(downloadURL);


       
        });
      }
      );
   

  })

}


  async function getProgressSlider( group){
    var slider=[];
    var max=0;
    console.log("slider");
   try{
         const q = query(collection(db, "Notebook"),where("group","==",group));
   
         const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
           // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log("slider"+ doc.data().slider);
           slider.push(doc.data().slider);
         });
   
        for(let i=0; i<slider.length;i++){
          if(slider[i]>max){
            max=slider[i];
          }
        }
         
         return max;
     }  
     catch(e){
       console.error("Error finding slider progress: ", e);
     }
   
   
   }


   async function getSlider( group){
    var slider=[];
    var max=0;
    console.log("slider");
   try{
          const q = query(
            collection(db, "Notebook"),
            where("group", "==", group),
            orderBy("date") // Order by date in ascending order
          );
   
         const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
           // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log("slider"+ doc.data().slider);
           slider.push(doc.data().slider);
         });
   
        max=slider[0];
         
         return max;
     }  
     catch(e){
       console.error("Error finding slider progress: ", e);
     }
   
   
   }



async function uploadText(project, group,date,image, member, slider, progress, problem, plan, imgBool, chosen){


  try {
    const docRef = await addDoc(collection(db,"Notebook/"), {
      user: getAuth().currentUser.uid,
      project: project,
      group: group,
      subGroup :chosen,
      date: date,
      image : image,
      member : member,
      slider: slider,
      progress: progress,
      problem: problem,
      plan: plan,
      imgBool:imgBool,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  
}


async function setNewProject(projectName,group_1,group_1_1,group_1_2, group_1_3, group_2, group_2_1, group_2_2, group_2_3,group_3, group_3_1, group_3_2, group_3_3){
console.log("in the neww project async")

  try {
    const docRef = await addDoc(collection(db,"UserInformation/"), {
      user: getAuth().currentUser.uid,
      projectName: projectName,

      group1: group_1,
      group_1_1: group_1_1,
      group_1_2: group_1_2,
      group_1_3: group_1_3,
      
      group_2: group_2,
      group_2_1: group_2_1, 
      group_2_2: group_2_2, 
      group_2_3: group_2_3,

      group_3: group_3,
      group_3_1: group_3_1, 
      group_3_2: group_3_2, 
      group_3_3: group_3_3

    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  
}


//getting data for allNotes

async function getGroupPastNote(project, noteArr){
  console.log("in the neww project async")
  // let arr=[];
  try{
    noteArr.length=0;
    const q = query(collection(db, "Notebook"), where("project", "==", project), orderBy("date", "desc"));
    
    console.log("enter allNote dunction");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
       console.log(doc.id, " => ", doc.data());
       
       console.log(project);
      noteArr.push(doc.data())
    });

   return noteArr;
    
  
    
    
}  catch (e) {
      console.error("Error adding document: ", e);
    }
    
  }


  async function getGroupDivisionPastNote(project, Group, noteArr){
    console.log(project + Group + noteArr)
    // let arr=[];
    try{
      noteArr.length=0;
      const q = query(collection(db, "Notebook"), where("project", "==", project),where("group","==", Group));
      
      console.log("enter allNote dunction");
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
         console.log(doc.id, " => ", doc.data());
         
         console.log(project);
        noteArr.push(doc.data())
      });
  
     return noteArr;
      
    
      
      
  }  catch (e) {
        console.error("Error adding document: ", e);
      }
      
    }



// searching database






async function getPhotoForPreview(dateToday, group){
 var imgUrl=[];
 
try{
      const q = query(collection(db, "Notebook"), where("date", "==", dateToday),where("imgBool","==","1"),where("group","==",group));
      const q2 = query(collection(db, "Notebook"), where("date", "==", dateToday),where("imgBool","==","0"),where("group","==",group));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
         console.log(doc.id, " => ", doc.data());
         console.log(doc.data().image);
         console.log(group);
        imgUrl.push(doc.data().image);
      });

      if(imgUrl.length==0){
        const querySnapshot = await getDocs(q2);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          // console.log(doc.data().image);
          imgUrl.push(doc.data().image);
        });
      }
      
      return imgUrl;
  }  
  catch(e){
    console.error("Error finding img url: ", e);
  }


}

async function getUserProjects(){
  var projects=[];
  
 try{
       const q = query(collection(db, "UserInformation"), where("user", "==", getAuth().currentUser.uid));
       const querySnapshot = await getDocs(q);
       querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         projects.push(doc.data().projectName);
         console.log(projects);
       });
 
      
       
       return projects;
   }  
   catch(e){
     console.error("Error finding img url: ", e);
   }}



   async function getGroupDivision(selectedGroup, project){
    let groupDivision=[];
    
   try{
         const q = query(collection(db, "UserInformation"), where("user", "==", getAuth().currentUser.uid), where("projectName","==", project));
         const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
          if(selectedGroup==doc.data().group1){
            groupDivision[0]=doc.data().group_1_1;
            groupDivision[1]=doc.data().group_1_2;
            groupDivision[2]=doc.data().group_1_3;
          }
          else if(selectedGroup==doc.data().group_2){
            groupDivision[0]=doc.data().group_2_1;
            groupDivision[1]=doc.data().group_2_2;
            groupDivision[2]=doc.data().group_2_3;
          }
          else if(selectedGroup==doc.data().group_3){
            groupDivision[0]=doc.data().group_3_1;
            groupDivision[1]=doc.data().group_3_2;
            groupDivision[2]=doc.data().group_3_3;
          }
           
           
         });
   
        
         return groupDivision;
        
     }  
     catch(e){
       console.error("Error finding img url: ", e);
     }}


self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider("6Le4Jz0oAAAAAPXVUjODLG5JmY0KGHs3KerUwzDC"),
  isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
});

const auth = getAuth();
(async ()=>await setPersistence(auth, browserLocalPersistence))();
async function signIn( email, password){

  

  return new Promise((resolve, reject)=>{

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    const user = userCredential.user;
      resolve(user);

  }
  )
  .catch((error)=>{

    const errorMessage = error.message;

    reject(errorMessage);


  })
}
  )
}

  // let userString = auth.currentUser.uid;
  async function getUserNotes(project){
    console.log(project+"name")
  var userNotes=[];

  // console.log(userString+"!!!"+"look here");
  // "WmS4EGjVqUVJ8AqrxYjBa8ctMaH3"
 try{
       const q = query(collection(db, "UserInformation"), where("user", "==",auth.currentUser.uid),where("projectName","==",project));

 
       const querySnapshot = await getDocs(q);
       querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
        //  console.log(doc.id, " => ", doc.data());
        //  console.log(doc.data().note1+" "+doc.data().note2+" "+ doc.data().note3);
         userNotes.push(doc.data().group1);
         userNotes.push(doc.data().group_2);
         userNotes.push(doc.data().group_3);

         console.log(userNotes)
       });
 

       return userNotes;
   }  
   catch(e){
     console.error("Error finding img url: ", e);
   }
 
 
 }
 

export {
  uploadImage, getDownloadURL, uploadText, signIn, auth, getPhotoForPreview,getUserNotes, getProgressSlider,getAuth,setNewProject,getUserProjects, getSlider,getGroupPastNote,getGroupDivision,getGroupDivisionPastNote
}

