// Simplified list of Chinese provinces and major cities for the picker
export const cityData: Record<string, string[]> = {
  "北京市": ["东城区", "西城区", "朝阳区", "海淀区", "丰台区", "石景山区", "其他"],
  "上海市": ["黄浦区", "徐汇区", "长宁区", "静安区", "浦东新区", "闵行区", "其他"],
  "广东省": ["广州市", "深圳市", "珠海市", "佛山市", "东莞市", "中山市", "惠州市"],
  "浙江省": ["杭州市", "宁波市", "温州市", "嘉兴市", "绍兴市", "金华市"],
  "江苏省": ["南京市", "苏州市", "无锡市", "常州市", "南通市", "扬州市"],
  "四川省": ["成都市", "绵阳市", "德阳市", "宜宾市", "乐山市"],
  "湖北省": ["武汉市", "襄阳市", "宜昌市", "荆州市"],
  "福建省": ["福州市", "厦门市", "泉州市", "漳州市"],
  "山东省": ["济南市", "青岛市", "烟台市", "潍坊市", "临沂市"],
  "陕西省": ["西安市", "咸阳市", "宝鸡市", "延安市"],
  "湖南省": ["长沙市", "株洲市", "湘潭市", "岳阳市"],
  "河南省": ["郑州市", "洛阳市", "开封市", "新乡市"],
  "河北省": ["石家庄市", "唐山市", "保定市", "邯郸市"],
  "辽宁省": ["沈阳市", "大连市", "鞍山市"],
  "黑龙江省": ["哈尔滨市", "大庆市", "齐齐哈尔市"],
  "重庆市": ["渝中区", "江北区", "南岸区", "渝北区", "其他"],
  "天津市": ["和平区", "河西区", "南开区", "滨海新区"],
  "其他": ["其他城市"]
};

export const provinces = Object.keys(cityData);

// Generate Date Options
const currentYear = new Date().getFullYear();
export const years = Array.from({ length: 100 }, (_, i) => (currentYear - 99 + i).toString());
export const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
export const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
export const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
export const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
