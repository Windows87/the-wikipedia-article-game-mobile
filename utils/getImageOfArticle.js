function getImageOfArticle(title) {
  return new Promise(async (next, reject) => {
  	try {
  	  const call = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&origin=*&titles=${title}&pithumbsize=1280`);
  	  const response = await call.json();
  	  const pageId = Object.getOwnPropertyNames(response.query.pages)[0];
  	  const pageThumbnail = response.query.pages[pageId].thumbnail;
  	  
  	  if(!pageThumbnail)
  	  	next(null);

  	  next(pageThumbnail.source);
  	} catch(error) {
  	  reject(error);
  	}
  });
}

export default getImageOfArticle;