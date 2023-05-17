import axios, { isAxiosError } from "axios";
import cheerio from 'cheerio';

export interface definitions {
    definitions: string[]
}

export async function getDefinition(word:string) {
 // URL of the web page to scrape.
const url = 'https://dilc.org/' + word

try {
    const response = await axios.get<string>(url)
    return scrapeDefinitions(response.data)
} catch (error) {
    // Error handling reference for axios and typescript:
    // https://www.neldeles.com/blog/posts/handling-axios-errors-in-typescript
    if (isAxiosError(error) && error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx.
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (isAxiosError(error) && error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request);
    } else console.error(error)
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


