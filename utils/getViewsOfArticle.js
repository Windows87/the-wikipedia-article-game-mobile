import formateDate from './formateDate';

function getViewsOfArticle(title) {
  return new Promise(async (next, reject) => {
  	const todayDate = new Date();
  	const aMonthAgoDate = new Date(todayDate.getFullYear(), todayDate.getMonth() - 1, todayDate.getDate());
  	const todayDateFormated = formateDate(todayDate);
  	const aMonthAgoDateFormated = formateDate(aMonthAgoDate);

  	try {
  	  const call = await fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${title}/daily/${aMonthAgoDateFormated}/${todayDateFormated}`);
  	  const response = await call.json();
  	  let totalViews = 0;

      if(!response.items.length)
        return next(0);

  	  response.items.forEach(item => {
  	  	totalViews += item.views;
  	  });

  	  next(totalViews);
  	} catch(error) {
  	  reject(error);
  	}
  });
}

export default getViewsOfArticle;