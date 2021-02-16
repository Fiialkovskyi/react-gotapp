export default class gotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    async getAllCharacters(id) {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformChar);
    }

    async getCharacter(id){
        const character = await this.getResource(`/characters/${id}`);
        return this._transformChar(character);
    }

    async getAllHouses() {
        const res = await this.getResource('/houses/');
        return res.map(this._transformHouse);
    }

    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    async getAllBooks() {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }

    async getBook(id) {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    _transformChar(char) {
        return {
            name: char.name || 'N/A',
            gender: char.gender || 'N/A',
            born: char.born || 'N/A',
            died: char.died || 'N/A',
            culture: char.culture  || 'N/A'
        };
    }

    _transformHouse(house) {
        return {
            name: house.name  || 'N/A',
            region: house.region  || 'N/A',
            words: house.words  || 'N/A',
            titles: house.titles  || 'N/A',
            overlord: house.overlord  || 'N/A',
            ancentralWeapons: house.ancentralWeapons  || 'N/A'
        };
    }

    _transformBook(book) {
        return {
            name: book.name  || 'N/A',
            numberOfPages: book.numberOfPages  || 'N/A',
            publiser: book.publiser  || 'N/A',
            released: book.released  || 'N/A'
        };
    }
}