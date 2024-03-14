/* CONFIGURANDO O JS PARA NÃO RECARREGAR A PAGINA AO SUBMETER UM VALOR DENTRO DO CAMPO DE BUSCA */

document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if(!cityName) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

    /* CRIANDO AS VARIAVEIS PARA INTEGRAR A API */
    const apiKey = '0d6a58c0b3e29837395f76e28092052a';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
    
    /* REALIZANDO A INTEGRAÇÃO COM A API DO OpenWeather  */
    const results = await fetch(apiUrl);
    const json = await results.json();

    /* CRIANDO UMA CONDIÇÃO PARA QUE SE A MESMA FOR VERDADEIRA, PUXAR OS DADOS SELECIONADOS/SETADOS ABAIXO QUE SERÃO PUXADOS DE DENTRO DA API */
    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });

    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`
            Não foi possível localizar...

            <img src="assets/images/search_location.svg"/>
        `)
    }

});

/* CRIANDO UMA FUNÇÃO PARA EXIBIR NA TELA OS DADOS PUXADOS DA API, QUE CRIAMOS LOGO ACIMA COM UMA CONDIÇÃO (IF) */
function showInfo(json) {
    showAlert('');

    document.querySelector("#weather").classList.add('show');


    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>ºC</sup>`;
    
    document.querySelector('#temp_description').innerHTML = `${json.description}`;

    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>ºC</sup>`;

    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>ºC</sup>`;

    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;

    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;

}


/* CRIANDO UMA FUNÇÃO PARA INSERIR O ALERTA DENTRO DO CARD DA APLICAÇÃO E NÃO SER UM ALERT NORMAL */
function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}

document.getElementById('city_name').value = "Montenegro, BR";
