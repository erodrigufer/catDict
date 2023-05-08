import axios from "axios";
import cheerio from 'cheerio';

export interface definitions {
    definitions: string[]
}

export async function getDefinition(word:string) {
 // URL of the web page to scrape.
const url = 'https://dilc.org/' + word

try {
    const response = await axios.get<string>(url)
    //  return response.data
    return scrapeDefinitions(response.data)
}catch (error) {
    console.error(error)
    // throw new Error('An error took place.')
}

}

function scrapeDefinitions(doc:string):definitions {
    let definitions:definitions = {
        definitions: []
    }
    const $ = cheerio.load(doc);

    // Find <ul> with class "definicio", and its <li> children.
    const lis = $('ul.definicio').find('li')

    // No definitions found.
    if (lis.length === 0){
        return definitions
    }

    // For each <li> element print an index and the text of the element.
    lis.each((index, element) => {
        definitions.definitions.push($(element).text())
        // console.log(`${index+1}: ${$(element).text()}`);
    })
    return definitions

}
