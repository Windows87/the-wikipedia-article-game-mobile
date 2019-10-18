import getImageOfArticle from './getImageOfArticle';
import getViewsOfArticle from './getViewsOfArticle';

function generateRandomArticle() {
  return new Promise(async (next, reject) => {
  	try {
  	  const call = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&origin=*&rnnamespace=0&prop=images&rnlimit=1');
  	  const response = await call.json();
  	  const result = response.query.random;
  	  next(result[0]);
  	} catch(error) {
  	  reject(error);
  	}
  });
}

function generateTwoRandomArticles() {
  return new Promise(async (next, reject) => {
    try {
      const articles = [];

      while(articles.length !== 2) {
        const article = await generateRandomArticle();
        article.image = await getImageOfArticle(article.title);

        if(articles[0]) {
          if(articles[0].title === article.title)
            return;
        }

        if(article.image) {
          article.views = await getViewsOfArticle(article.title);
          articles.push(article);
        }
      }

      next(articles);
    } catch(error) {
      reject(error);
    }
  });
}

export { generateRandomArticle, generateTwoRandomArticles };