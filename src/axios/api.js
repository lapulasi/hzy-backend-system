/**
 * Created by laplace on 2019/5/10.
 */
import service from './request'
import baseUrl from './baseUrl'
import axios from 'axios'
import qs from 'qs';

const Api = {
  /*
   * 获取诗人标签列表
   * */
  getTagName () {
    return axios.get(`${baseUrl.baseUrl}/getAuthorTags`);
  },
  /*
   * 汉字转拼音
   * */
  getPinYin(params) {
    return axios.get(`${baseUrl.baseUrl}/getBasePoetry`, {
      params: params
    });
  },
  /*
   * 新建诗人
   * */
  addPoet(params) {
    return axios.post(`${baseUrl.baseUrl}/addAuthor`, params);
  },
  /*
   *获取诗人列表
   * */
  searchPoet(params) {
    return axios.get(`${baseUrl.baseUrl}/searchAuthor`, {
      params: params
    });
  },
  /*
  * 诗人列表--诗人管理--获取某一诗人的诗词列表
  * */
  getAuthorAndPoetries(params) {
    return axios.get(`${baseUrl.baseUrl}/getAuthorAndPoetries`, {
      params: params
    });
  },
  /*
  * 诗人列表--诗人管理--添加诗词--获取诗词列表（去掉已经有主的诗词）
  * */
  poetSearchPoetry(params) {
    return axios.get(`${baseUrl.baseUrl}/getPoetriesNotAuthor`, {
      params: params
    });
  },
  /*
   * 诗人列表--诗人管理--给某一诗人添加诗词
   * */
  authorAddPoetry(params) {
    return axios.post(`${baseUrl.baseUrl}/authorAddPoetry`, params);
  },
  /*
   * 诗人列表--诗人管理--排序
   * */
  managementPoetryListSort(params) {
    return axios.get(`${baseUrl.baseUrl}/setPoetrySerialNumberAuthor`, {
      params: params
    });
  },
  /*
   * 新建诗人标签
   * */
  addTag(params) {
    return axios.get(`${baseUrl.baseUrl}/addAuthorTag`, {
      params: params
    });
  },
  /*
   * 诗人列表--排序
   * */
  poetListSort(params) {
    return axios.get(`${baseUrl.baseUrl}/setAuthorSerialNumber`, {
      params: params
    });
  },
  /*
   * 诗人列表--隐藏
   * */
  hidePoet(params)
  {
    return axios.post(`${baseUrl.baseUrl}/changeAuthorShowingStatus`, params);
    // return service.POST('/changeAuthorShowingStatus', params);
  }
  ,
  /*
   * 诗人列表--删除
   * */
  poetListDelete(params) {
    return axios.get(`${baseUrl.baseUrl}/deleteAuthor`, {
      params: params
    });
  },
  /*
   * 诗人列表--编辑--获取单个诗人信息
   * */
  getPoetInfo(params) {
    return axios.get(`${baseUrl.baseUrl}/getAuthorById`, {
      params: params
    });
  },
  /*
   * 诗人列表--编辑
   * */
  editorPoet(params) {
    return axios.post(`${baseUrl.baseUrl}/editAuthor`, params);
  },
  /*
   *获取诗词列表
   * */
  searchPoetry(params) {
    return axios.get(`${baseUrl.baseUrl}/searchPoetries`, {
      params: params
    });
  },
  /*
   * 新建诗词
   * */
  addPoetry(params)
  {
    return axios.post(`${baseUrl.baseUrl}/addPoetry`, params);
  },
  /*
   * 诗词列表--编辑--获取单个诗信息
   * */
  getPoetryInfo(params)
  {
    return axios.get(`${baseUrl.baseUrl}/getPoetryById`, {
      params: params
    });
  }
  ,
  /*
   * 诗词列表--排序
   * */
  poetryListSort(params)
  {
    return axios.get(`${baseUrl.baseUrl}/setPoetrySerialNumber`, {
      params: params
    });
  }
  ,
  /*
   * 诗词列表--隐藏
   * */
  hidePoetry(params)
  {
    return axios.post(`${baseUrl.baseUrl}/changePoetryShowingStatus`, qs.stringify(params));
  }
  ,
  /*
   * 诗词列表--编辑
   * */
  reeditPoetry(params)
  {
    return axios.post(`${baseUrl.baseUrl}/reeditPoetry`, params);
    // return service.POST('/reeditPoetry', params);
  },
  /*
   * 诗词列表--删除
   * */
  poetryListDelete(params)
  {
    return axios.get(`${baseUrl.baseUrl}/deletePoetry`, {
      params: params
    });
  }
  ,
  /*
   * 获取诗词标签列表
   * */
  getPoetryTagName()
  {
    return axios.get(`${baseUrl.baseUrl}/getPoetryTags`);
  }
  ,
  /*
   * 新建诗词标签
   * */
  addPoetryTag(params)
  {
    return axios.get(`${baseUrl.baseUrl}/addPoetryTag`, {
      params: params
    });
  }
  ,
  /*
   * 新建首页卡片列表
   * */
  createdCard(params) {
    return axios.post(`${baseUrl.baseUrl}/addPoetryCard`, params);
  },
  /*
  * 获取首页卡片列表
  * */
  getCardList(params) {
    return axios.get(`${baseUrl.baseUrl}/searchPoetryCards`, {
      params: params
    });
  },

  /*
   * 首页卡片列表--排序
   * */
  cardListSort(params)
  {
    return axios.get(`${baseUrl.baseUrl}/setSerialNumbe`, {
      params: params
    });
  }
  ,
  /*
   * 首页卡片列表--隐藏
   * */
  hideCardList(params)
  {
    return axios.post(`${baseUrl.baseUrl}/changeShowingStatus`, qs.stringify(params));
  }
  ,
  /*
   * 首页卡片列表--删除
   * */
  cardListDelete(params)
  {
    return axios.get(`${baseUrl.baseUrl}/deletePoetryCard`, {
      params: params
    });
  },
  /*
   * 首页卡片列表--编辑--获取卡片信息
   * */
  getEditorCardInfo(params)
  {
    return axios.get(`${baseUrl.baseUrl}/getPoetryCard`, {
      params: params
    });
  },
  /*
   * 首页卡片列表--编辑
   * */
  reEditorCard(params)
  {
    return axios.post(`${baseUrl.baseUrl}/reeditPoetryCard`, params);
  }
  ,
  /*
  * 添加热搜词
  * */
  addHotSearchWord(params) {
    return axios.post(`${baseUrl.baseUrl}/addHotSearchWord`, qs.stringify(params));
  },
  /*
  * 获取热词列表
  * */
  getHotSearchWords(params) {
    return axios.get(`${baseUrl.baseUrl}/getHotSearchWords`, {
      params: params
    });
  },
  /*
   * 热搜词列表--排序
   * */
  hotWordListSort(params)
  {
    return axios.get(`${baseUrl.baseUrl}/setSerialNumber`, {
      params: params
    });
  }
  ,
  /*
   * 热搜词列表--删除
   * */
  hotWordListDelete(params)
  {
    return axios.get(`${baseUrl.baseUrl}/deleteHotSearchWord`, {
      params: params
    });
  }
  ,
  /*
   * 热搜词列表--编辑
   * */
  hotWordListEditor(params)
  {
    return axios.post(`${baseUrl.baseUrl}/reeditHotSearchWord`, qs.stringify(params));
  },
  /*
  * 登录
  * */
  login(params) {
    return axios.get(`${baseUrl.baseUrl}/managerLogin`, {
      params: params
    });
    // return service.GET('/managerLogin', params);
  },
  /*
  * 判断token是否过期
  * */
  verifyToken(params) {
    return axios.get(`${baseUrl.baseUrl}/verifyToken`, {
      params: params
    });
  },
  /*
  * 获取用户列表
  * */
  getUserList(params) {
    return axios.get(`${baseUrl.baseUrl}/searchUsers`, {
      params: params
    });
  },
  getStarRecode(params) {
    return axios.get(`${baseUrl.baseUrl}/getStarRecord`, {
      params: params
    });
  },
  /*
  * 导出诗人
  * */
  exportAuthors() {
    return `${baseUrl.baseUrl}/exportAuthors`;
  },
  /*
  * 导出诗词
  * */
  exportPoetrys() {
    return `${baseUrl.baseUrl}/exportPoetries`;
  },
  /*
   * 导出卡片
   * */
  exportCards() {
    return `${baseUrl.baseUrl}/exportPoetryCards`;
  },
  /*
   * 导出用户列表
   * */
  exportUserLists() {
    return `${baseUrl.baseUrl}/exportUsers`;
  },
  /*
  * 星星详情导出
  * */
  exportStars() {
    return `${baseUrl.baseUrl}/exportStarRecord`;
  }
  /*
   * // 新闻列表
   articleList () {
   return axios.get(`${base.sq}/topics`);
   },
   // 新闻详情,演示
   articleDetail (id, params) {
   return axios.get(`${base.sq}/topic/${id}`, {
   params: params
   });
   },
   // post提交
   login (params) {
   return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
   }
   */
}
export default  Api;
