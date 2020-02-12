addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  const createScriptReader = html => {
    return id => {
      const str = `id="${id}">`;
      const s1 = html.indexOf(str);
      const e1 = html.indexOf('</script>', s1);
      const script = html.substring(s1 + str.length, e1);
      return script;
    };
  };
  
  const getData = text => {
    const p1 = text.indexOf('=');
    return JSON.parse(text.slice(p1 + 2, -11))
  };
  
  /**
   * Fetch and log a request
   * @param {Request} request
   */
  async function handleRequest(request) {
    const response = await fetch(`https://3g.dxy.cn/newh5/view/pneumonia`)
    const html = await response.text();
  
    const getScript = createScriptReader(html);
    const getAreaStat = getScript('getAreaStat');
    const getWikiList = getScript('getWikiList');
  
    const getIndexRumorList = getScript('getIndexRumorList');
    const getTimelineService = getScript('getTimelineService');
    const getStatisticsService = getScript('getStatisticsService');
    const getIndexRecommendList = getScript('getIndexRecommendList');
    const getListByCountryTypeService1 = getScript('getListByCountryTypeService1');
  
    const body = {
      AreaStat: getData(getAreaStat),
      WikiList: getData(getWikiList),
      IndexRumorList: getData(getIndexRumorList),
      TimelineService: getData(getTimelineService),
      StatisticsService: getData(getStatisticsService),
      IndexRecommendList: getData(getIndexRecommendList),
      ListByCountryTypeService1: getData(getListByCountryTypeService1),
    };
  
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    return new Response(JSON.stringify(body), {
      status: 200,
      headers
  
    });
  }