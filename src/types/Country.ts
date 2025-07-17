class Country {
    static Random(): string {
        const countries = ["USA", "Canada", "Mexico", "UK", "Germany", "France", "Spain", "Italy"];
        const randomIndex = Math.floor(Math.random() * countries.length);
        return countries[randomIndex];
    }
}

export default Country;
