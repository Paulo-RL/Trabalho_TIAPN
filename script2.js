var PAGE = true;

function CPA() {
  if (PAGE == true) {
    console.log("Vem aqui?");
    PAGE = false;
    Body();
  } else if (PAGE == false) {
    PAGE = true;
    Body();
  }
}
function Body(){
    if(PAGE==true){
        document.getElementById('FB').style.visibility="visible"
        document.getElementById('MB').innerHTML=`
        <div class="container-fluid">
            <div class="row bg-dark">
                <div class="col-12 col-lg-3 col-md-3">
                    <p class="text-center text-light pt-2" style="font-size: 100%;" id="fl">Filtrar</p>
                    <div class="Filtro">
                        <div id="filters" class="filter-container">
              
                        </div>
                    <button type="button" class="btn btn-outline-danger btn-sm mb-3" onclick="filtro()" id="fb">Filtrar</button>
                    </div>

                </div>

                <div class="col-12 col-lg-9 col-md-9" id="carossa">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators" id="cInd"></div>
                        <div class="carousel-inner" id="cIns"></div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

            </div>

        </div>
        
        <div class="row">
            <div class="col- col-md-9 col-lg-8" id="CardsCont">
                
            </div>

            <div class="col- mt-3 col-md-3 col-lg-4">
                <div class="row">
                    <p class="text-center text-danger fs-4">Melhores Produtos</p>
                    <!-- Os melhores produtos são baseados na minha opinião, por isso peço que não os julgue -->
                    <div id="mpCont" class="row"></div>

                    <button type="submit" class="btn btn-outline-danger my-2" onclick="window.location.href ='Biblioteca/bib.html' ">Veja mais produtos</button>

                </div>
                <div class="row mt-3 bg-dark rounded" >
                    <div><p>               </p></div>
                </div>

            </div>
        </div>
        </div>`
        loadCard()
    }
    else if(PAGE==false){
        document.getElementById('FB').style.visibility="hidden"
        document.getElementById('MB').innerHTML=`
        <div class="container-fluid">
        <div class="row">
            <div class="col-11">
                <h1>Serviço de atendimento ao Consumidor</h1>
                <br>
                <br>
            </div>
            <div class="col-1">
                <h5 onclick="CPA()">Retornar</h5>
            </div>
            <div class="col-12">
                <h4>TELEFONE DE CONTATO:</h4>
                <h5>(31)99933-9393</h5>
                <h4>WhatZap<i class="fa-brands fa-whatsapp" style="color: #12ce15;"></i>:</h4>
                <h5>(31)99991-4538</h5>
            </div>
        </div>
    </div>`
    }
}