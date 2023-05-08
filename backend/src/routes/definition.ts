import axios from "axios";
import cheerio from 'cheerio';



export async function getDefinition(word:string) {
 // URL of the web page to scrape.
const url = 'https://dilc.org/' + word

try {
    const response = await axios.get<string>(url)
    //  return response.data
    scrapeDefinitions(response.data)
}catch (error) {
    console.error(error)
    // throw new Error('An error took place.')
}

}

function scrapeDefinitions(doc:string) {
    const $ = cheerio.load(doc);

    // Find <ul> with class "definicio", and its <li> children.
    const lis = $('ul.definicio').find('li')

    // if (lis.length === 0){
    //     console.log(`No entries found for word '${inputUser}'.`)
    // }

    // For each <li> element print an index and the text of the element.
    lis.each((index, element) => {
    console.log(`${index+1}: ${$(element).text()}`);
    })

}
