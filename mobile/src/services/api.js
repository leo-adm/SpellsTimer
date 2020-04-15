async function getChampionsData(){
    const url = "http://ddragon.leagueoflegends.com/cdn/10.7.1/data/pt_BR/champion.json"
    var champData;
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            champData = data.data;
        })
        .catch(() => {})
    return champData
};

async function getSpellsData(){
    const url = "http://ddragon.leagueoflegends.com/cdn/10.7.1/data/pt_BR/summoner.json"
    var spellData;
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            spellData = data.data;
        })
        .catch(() => {})
    return spellData;
};

var championsData;
var spellsData;

async function load(){
    this.championsData = await getChampionsData();
    this.spellsData = await getSpellsData();
}

load();

const api = {
    // championsData: this.championsData,
    // spellsData: this.spellsData,

    getChampImage: (champId) => {
        let championName;
        for (var i in championsData) {
            if (championsData[i].key == champId) {
                championName = championsData[i].id
                break;
            }
        }
        return { uri: "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/" + championName + ".png" }
    },

    getSpellImage: (spellId) => {
        let spellName;
        for (var i in spellsData) {
            if (spellsData[i].key == spellId) {
                spellName = spellsData[i].id
                break;
            }
        }
        return { uri: "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/spell/" + spellName + ".png" }
    }
}

api["championsData"] = championsData;
api["spellsData"] = spellsData;

export default api;