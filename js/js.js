// async function 
// show six data display
const loadSixData = async() => {
    try{
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    showCard(data.data.tools.slice(0, 6))
    }
    catch(error){
        console.log(error)
    }
    toggleSpinner(false);
    
}

// sorting date 
const monir = async() => {
    try{
        toggleSpinner(true);
        const url = `https://openapi.programming-hero.com/api/ai/tools`
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.data.tools.slice(0, 6))
        const sor = data.data.tools.slice(0, 6);
        sor.sort(function(a, b) {
            var c = new Date(a.published_in);
            var d = new Date(b.published_in);
            return d-c;
        });
        showCard(sor)
        }
        catch(error){
            console.log(error)
        }
        toggleSpinner(false);
}

const loadAllData = async() => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    showCard(data.data.tools)
    toggleSpinner(false);
}

// display  data 
const showCard = data =>{
    const allDiv = document.getElementById('car-container');
    allDiv.innerHTML = '';
    data.forEach(cardInformation => {
        const {features, name, image, published_in, id} = cardInformation;
        
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
                  <div class="card p-2 h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img src="${image}"  class="card-img-top h-75">
                    <div class="card-body p-0 mt-3" style="font-size: 14px;">
                      <h5 class="card-title">features</h5>
                      <ol class="ps-3" type="1" style="font-family:Poppins;">
                        <li>N${features[0]}</li>
                        <li>${features[1]}</li>
                        <li>${features[2]}</li>
                      </ol>
                    </div>
                    <hr class="m-0 p-0">
                    <div class="d-flex mt-2 justify-content-between">
                      <div>
                        <h5 class="card-title">${name}</h5>
                        <p class="p-0 m-0" style="font-family:Poppins; font-size: 14px;"><i class="fa-solid fa-calendar-days"></i> ${published_in}</p>
                      </div>
                      <div>
                        <img onclick="loadCardIfo('${id}')" href="#" data-bs-toggle="modal" data-bs-target="#modalInformation" class="mt-2" src="asset/right-arrow.gif" style="height: 40px; width: 40px;" alt="" srcset="">
                      </div>
                    </div>
                  </div>
        `;
        allDiv.appendChild(div);
    })
}

// display all data 
document.getElementById('showAllData').addEventListener('click', function(){
    loadAllData();
    document.getElementById('showAllData').style.display = 'none';
})

// spinner add 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        document.getElementById('main-div').classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}
loadSixData();

// fetch data modal 
const loadCardIfo = (id) =>{
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayModal(data))
   
}

const displayModal = info =>{
  const {data} = info;
  const {image_link, description, pricing, features, integrations, input_output_examples, accuracy} = data;
  const allInfo = document.getElementById('modal-details');
  allInfo.innerHTML = '';
  const modalDiv = document.createElement('div');
  modalDiv.innerHTML = `
  <div class="modal-content">
            <div class="modal-header">
                <button style="margin-top: -40px; margin-right: -40px; background-color: red; height: 35px; width: 35px;" type="button" class="btn-close rounded-5" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body m-5 d-flex gap-3 " style="max-height: 500px;">
                <div class="w-50 rounded p-5" style="border: 1px solid red; background-color: rgb(234, 182, 182);"> 
                    <h5 class="w-75 px-3">${description ? description : 'No! Not Yet'}</h5>
                    <div class="d-flex justify-content-around text-center my-4">
                        <div class="bg-light w-25  rounded">
                            <p class="m-0 pt-3 text-success">${pricing ? pricing[0].price : 'No! Not Yet'} ${pricing ? pricing[0].plan : 'No! Not Yet'}</p>
                        </div>
                        <div class="bg-light w-25  rounded">
                            <p class="m-0 pt-3 text-info">${pricing ? pricing[1].price : 'No! Not Yet'} ${pricing ? pricing[1].plan : 'No! Not Yet'}</p>
                        </div>
                        <div class="bg-light w-25  rounded">
                            <p class="m-0 pt-2 text-danger">${pricing ? pricing[2].price : 'No! Not Yet'} ${pricing ? pricing[2].plan : 'No! Not Yet'}</p>
                        </div>
                    </div>
                    <div class="d-flex px-3 justify-content-between g">
                        <div>
                            <h5>features</h5>
                            <ul class="p-3 py-0" style="font-size: 14px; font-family:Poppins;">
                                <li>${features[1] ? features[1].feature_name : 'No file' }</li>
                                <li>${features[2] ? features[2].feature_name :  'No file'}</li>
                                <li>${features[3] ? features[3].feature_name : 'No file'}</li>
                            </ul>
                        </div>
                        <div>
                            <h5>Integrations</h5>
                            <ul class="p-3 py-0" style="font-size: 14px; font-family:Poppins;">
                                <li>${integrations ? integrations[0] : 'No text'}</li>
                                <li>${integrations ? integrations[1] : 'No text'}</li>
                                <li>${integrations ? integrations[2] : 'No text'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="w-50 p-3 order-1 rounded text-center" style="border: 1px solid rgb(179, 164, 164);">
                    <div class="w-100" style="position: relative;">
                        <button id="accuracy"  style="margin-bottom: -60px; margin-right: -280px;" type="button" class="btn btn-danger px-3 py-0 d-none">${accuracy.score} % accuracy</button>
                    </div>
                    <img class = "w-100 rounded"  src="${image_link[0] ? image_link[0] : 'No! Not Yet' }" alt="" srcset="">
                    <h5 class="mt-2">${input_output_examples ? input_output_examples[0].input : 'No! Not Yet'}</h5>
                    <p class="px-3" style="font-family:'Poppins', sans-serif;">${input_output_examples ? input_output_examples[0].output : 'Not Yet break' }</p>
                </div>
            </div>
  `;
  allInfo.appendChild(modalDiv)
  if(accuracy.score){
    const sho = document.getElementById('accuracy')
    sho.classList.remove('d-none')
  }
  
}


