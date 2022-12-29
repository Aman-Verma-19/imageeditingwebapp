const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button");
filterName = document.querySelector(".filter-info .name");
filterValue = document.querySelector(".filter-info .value");
filterSlider = document.querySelector(".slider input");
rotateOptions = document.querySelectorAll(".rotate button");
previewImg = document.querySelector(".preview-img img");
resetFilterBtn = document.querySelector(".reset-filter");
chooseImgBtn = document.querySelector(".choose-img");
saveImgBtn = document.querySelector(".save-img");


let brightness = 100, contrast = 100 , saturation = 100, inversion = 0, grayscale = 0   , hue = 0 ,  sepia = 0 , opacity = 100 ,  blur = 0;
let rotate = 0 , fliphorizontal = 1 , flipvertical = 1;

const applyFilters = () => {
    previewImg.style.transform =`rotate(${rotate}deg) scale(${fliphorizontal} , ${flipvertical})`
    previewImg.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) hue-rotate(${hue}deg) sepia(${sepia}%) opacity(${opacity}%) blur(${blur}px)`;
}

const loadImage = () => {
    let file = fileInput.files[0];  //getting user selected file
    if (!file) return; // return if user notr select
    previewImg.src = URL.createObjectURL(file);  //passing img in preview 
    previewImg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
        document.querySelector(".choose-img").classList.remove("for-anim");
    });
};

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;  //for change filter name

        if (option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }
        else if (option.id === "contrast") {
            filterSlider.max = "200";
            filterSlider.value = contrast;
            filterValue.innerText = `${contrast}%`;
        }
        else if (option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }
        else if (option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }
        else if (option.id === "hue") {
            filterSlider.max = "100";
            filterSlider.value = hue;
            filterValue.innerText = `${hue}%`;
        }
        else if (option.id === "sepia") {
            filterSlider.max = "100";
            filterSlider.value = sepia;
            filterValue.innerText = `${sepia}%`;
        }
        else if (option.id === "opacity") {
            filterSlider.max = "100";
            filterSlider.value = opacity;
            filterValue.innerText = `${opacity}%`;
        }
        else if (option.id === "blur") {
            filterSlider.max = "10";
            filterSlider.value = blur;
            filterValue.innerText = `${blur}px`;
        }
        else{
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        } 
        

    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active"); //geting selected filter button

    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;

    }
    else if (selectedFilter.id === "contrast") {
        contrast = filterSlider.value;

    }
    else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value;

    }

    else if (selectedFilter.id === "inversion") {
        inversion = filterSlider.value;

    }
    else if (selectedFilter.id === "hue") {
        hue = filterSlider.value;

    }
    else if (selectedFilter.id === "sepia") {
        sepia = filterSlider.value;

    }
    else if (selectedFilter.id === "opacity") {
        opacity = filterSlider.value;
    }

    else if (selectedFilter.id === "blur") {
        blur = filterSlider.value;
    }

    else {
        grayscale = filterSlider.value;
    }
        applyFilters();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {  //addimg clicki event listener to all the rotate button
        if (option.id === "left"){
            rotate -= 90;
        }
        else if (option.id === "right"){
            rotate += 90;
        }
        else if (option.id === "horizontal"){
            fliphorizontal = fliphorizontal === 1 ? -1 : 1;  //if horizontal value is 1 set value -1 else set 1
        }
        else{
            flipvertical = flipvertical === 1 ? -1 : 1;
        }
        applyFilters();
    });
    
})

const resetFilter = () =>{
//reset all value to the default

    brightness = 100, contrast = 100 , saturation = 100, inversion = 0, grayscale = 0 , hue = 0 , opacity = 100  , blur = 0 , sepia = 0;
    rotate = 0 , fliphorizontal = 1 , flipvertical = 1;

    filterOptions[0].click();    // click brightness btn so the brightness selected by default
    applyFilters();
}

const saveImage = () =>{
    const canvas = document.createElement("canvas"); //create canvas element
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter =`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)  hue-rotate(${hue}deg) sepia(${sepia}%)  opacity(${opacity}%) blur(${blur}px)`;
    ctx.translate(canvas.width / 2 , canvas.height / 2)
    if(rotate !==0 ) {
        ctx.rotate(rotate * Math.PI / 180); 
    }
    ctx.scale(fliphorizontal , flipvertical)
    ctx.drawImage(previewImg , -canvas.width /2   , -canvas.height / 2, canvas.width  , canvas.height )
    // document.body.appendChild(canvas)  //for showing what type of images
    const link = document.createElement("a");  // creating <a> tag
    link.download ="image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());