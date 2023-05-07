import axios from "axios";

async function getDefinition(word:string) {
 // URL of the web page to scrape.
const url = 'https://dilc.org/' + word

try {
    const response = await axios.get(url)
    return response.data
}catch (error) {
    throw new Error('An error took place.')
}
}

export default getDefinition;

// axios.get(url)
//   .then(response => {
//     const $ = cheerio.load(response.data);

//     // Print word that is being looked for as scraped from the website.
//     console.log(getWord($))
//     console.log(``)

//     // Find <ul> with class "definicio", and its <li> children.
//     const lis = $('ul.definicio').find('li')

//     if (lis.length === 0){
//         console.log(`No entries found for word '${inputUser}'.`)
//         // End program without an error status code.
//         process.exit(0)
//     }

//     // For each <li> element print an index and the text of the element.
//     lis.each((index, element) => {
//     console.log(`${index+1}: ${$(element).text()}`);
//     })

//   })
//   .catch(error => {
//     console.log('Error: ' + error);
//     process.exit(1)
//   });   
// }

