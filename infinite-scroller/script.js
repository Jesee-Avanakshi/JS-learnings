const imageContainer=document.getElementById('imagecontainer');
const loader = document.getElementById('loader');

let ready =false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];

const count=30;
const apikey= 'UwLHHUTixH8Pxyxg5Fc_pEmBV41ZYg8mcsyZj7O9V68';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`

function imageLoaded(){
    
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden =true;
        
    }
}

function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
    
}


//displaying
function displayPhotos(){
    imagesLoaded=0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item =document.createElement('a');
        setAttributes(item,{
            href: photo.links.html , 
            target: '_blank',
        });
        const img =document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular, 
            alt: photo.alt_description, 
            title: photo.alt_description,
        });
        img.addEventListener('load',imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


//get photos
async function getPhotos(){
    try{
        const response =await fetch(apiUrl);
        photosArray = await response.json();
        
        displayPhotos();
    }
    catch(error){

    }

}
window.addEventListener('scroll',() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
        
    }
});
//onload

getPhotos();