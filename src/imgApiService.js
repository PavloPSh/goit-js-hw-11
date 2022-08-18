import axios from "axios";



const axios = require('axios');


const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = `29321301-761f61f0cfd0cb17161116047`;

export default class ImgApiService {

    constructor () {
        this.inputQuery = '';
        this.page = 1;
        this.perPage = 40;
        this.url = '';
    }

    async fetchImg () {
    
        try {

            const response = await axios.get(
                `${BASE_URL}?key=${API_KEY}&q=${this.inputQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`
            );    
            
            this.incrementPage();
            this.makeUrl(response.config.url)
            return response.data;

        } catch (error) {
            console.log(error)
            };
            
    }

    makeUrl (url) {
        this.url = url
    }

    get currentUrl () {
        return this.url;
    }

    incrementPage () {
        this.page += 1;
    }

    resetPage(){
        this.page = 1;
    }

    get input () {
        return this.inputQuery;
    }

    set input (newInput) {
        return this.inputQuery = newInput;
    }
}

