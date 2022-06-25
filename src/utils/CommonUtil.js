import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";

// jsPDF 初期化，默认使用黑体字
export const initJSPDF = async (pdfTitle, bodyHeader, headerStyle) => {
   const doc = new jsPDF();
   doc.addFont('simhei.ttf', 'simhei', 'normal');
   doc.setFont('simhei');

   // 标题部分，白色背景，居中，粗体，20号字
   doc.autoTable({
      startY: 10,
      body: [[{content: pdfTitle, styles: {halign: 'center', fillColor: 255, fontStyle: 'bold', fontSize: 20}}]],
      didParseCell: function (data) {
         data.cell.styles.font = 'simhei'
      },
   });
   if (bodyHeader != null) {
      // 取得logo图片值
      let base64Img = await getImgBase64('/logo120.png');
      // 头部内容
      doc.autoTable({
         body: bodyHeader,
         didParseCell: function (data) {
            if (headerStyle != null) {
               data.cell.styles.fontSize = headerStyle.fontSize;
               data.cell.styles.cellPadding=headerStyle.cellPadding;
            }
            // 黑体字
            data.cell.styles.font = 'simhei';
            // 白底
            data.cell.styles.fillColor = 255;
         },
         didDrawCell: (data) => {
            // body第一个单元格，添加图片
            if (data.section === 'body' && data.column.index === 0) {
               doc.addImage(base64Img, 'JPEG', data.cell.x + 2, data.cell.y + 2, 20, 20)
            }
         },
      });
   }
   return doc;
};

export const previewPDF = (doc) => {
   let base64 = doc.output('datauristring');
   let pdfWindow = window.open("pdf.html");
   pdfWindow.localStorage.setItem('pdfData',base64);
};

// 将指定文件生成base64
export const getImgBase64 = async (imgSrc) => {
   let base64 = "";
   let img = new Image();
   img.src = imgSrc;
   let promise = new Promise(resolve => {
      img.onload = () => {
         let canvas = document.createElement("canvas");
         canvas.width = img.width;
         canvas.height = img.height;
         canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
         base64 = canvas.toDataURL("image/png");
         resolve(base64)
      };
   });
   await promise;
   return base64;
};

// 将指定文件下载
export const download = (fileContent, fileName) => {
   // 利用 Buffer 转为对象
   const buf = Buffer.from(fileContent);
   // 再输入到 Blob 生成文件
   let blob = new Blob([buf], {type: 'application/pdf'});
   let a = document.createElement('a');
   // 指定生成的文件名
   a.download = fileName;
   a.href = URL.createObjectURL(blob);
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
};

// 使用canvas，将HTML内容，生成为PDF文件
export const downLoadPDF = (dom, fileName) => {
   // 取得滚动条距离顶部位置
   let scrollTop = getScrollTop();
   window.scrollTo(0,0);
   html2canvas(dom, {
      // allowTaint: true, //避免一些不识别的图片干扰，默认为false，遇到不识别的图片干扰则会停止处理html2canvas
      // taintTest: false,
      useCORS: true,
      // Create a canvas with double-resolution.
      scale: 2,
      // Create a canvas with 144 dpi (1.5x resolution).
      dpi: 192,
      // 背景设为白色（默认为黑色）
      background: "#fff",
   }).then(function (canvas) {
      // Html / Canvas 画面 尺寸
      let contentWidth = canvas.width;
      let contentHeight = canvas.height;

      // 一页pdf显示html页面生成的canvas高度;（根据比例，算出来的固定值）
      let htmlPageHeight = contentWidth / 595.28 * 841.89;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      let pdfPageWidth = 595.28;
      let pdfPageHeight = 595.28 / contentWidth * contentHeight;
      let pageData = canvas.toDataURL('image/jpeg', 1.0);
      window.scrollTo(0,scrollTop);
      // 画面尺寸小于 一页，则默认为A4，否则：设定指定高度画面
      let pdf = new jsPDF('', 'pt', contentHeight < htmlPageHeight ? 'a4' : [pdfPageWidth, pdfPageHeight + 30]);
      pdf.addImage(pageData, 'JPEG', 0, 0, pdfPageWidth, pdfPageHeight);
      // 保存PDF文件
      pdf.save(fileName);
   });
};

//表头验证
export const titleFilter =(headerArray,colObjs) =>{
   if (colObjs.length != headerArray.length) {
      return false;
   } else {
      for (let i in headerArray) {
         if (colObjs[i].name != headerArray[i]) {
            return false
         }
      }
   }
}
// 主体条件判断
export const ContentFilter = function (contentArray,colObjs) {
   const tableContentErrorFilter=[];
   const tableContentFilter=[];
   let rightNumber=0;
   let errorNumber=0;
   for (let i = 0; i < contentArray.length; i++) {
      let flag=true;
      let cellType;
      for (let j = 0; j < colObjs.length; j++) {
         if (colObjs[j].require) {
            if (contentArray[i].data[j] == null && contentArray[i].data[j].length == 0) {
               errorNumber=errorNumber+1;
               console.log(contentArray[i].data[j]);
               tableContentErrorFilter.push(contentArray[i]);
               flag=false;
               break;
            }
         }
         if (contentArray[i].data[j] == '' || isNaN(contentArray[i].data[j])) {
            cellType= "string" ;
         } else {
            cellType= "number";
         }
         console.log(cellType)

         if (colObjs[j].type!="string" && colObjs[j].type!= cellType && contentArray[i].data[j] != '' &&colObjs[j].require ) {
            errorNumber=errorNumber+1;
            console.log(contentArray[i].data[j]);
            tableContentErrorFilter.push(contentArray[i]);
            flag=false;
            break;
         }
         if (colObjs[j].type=='string'&&(colObjs[j].length && colObjs[j].length != contentArray[i].data[j].length)) {
            errorNumber=errorNumber+1;
            console.log(colObjs[j]);
            tableContentErrorFilter.push(contentArray[i]);
            flag=false;
            break;
         }
      }
      if (flag == true) {
         rightNumber=rightNumber + 1;
         tableContentFilter.push(contentArray[i]);
      }
   }
   return {tableContentErrorFilter,tableContentFilter}
};

export const getJsonValue = (original, key) => {
   let ret = '未知';
   for (let i = 0; i < original.length; i++) {
      if (original[i].value === key) {
         ret = original[i].label;
         break;
      }
   }
   return ret;
};

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * @param date 要格式化的日期
 * @param format 指定格式 例：FormatUtil.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss.S q') ==> 2018-09-19 13:33:17.148 3
 */
export const formatDate = (date, format) => {
   // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
   // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   Date.prototype.Format = function (fmt) { //author: meizz
      let o = {
         "M+": this.getMonth() + 1,                     //月份
         "d+": this.getDate(),                          //日
         "h+": this.getHours(),                         //小时
         "m+": this.getMinutes(),                       //分
         "s+": this.getSeconds(),                       //秒
         "q+": Math.floor((this.getMonth() + 3) / 3),  //季度
         "S": this.getMilliseconds()                    //毫秒
      };
      if (/(y+)/.test(fmt))
         fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o)
         if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
   };

   // string类型时，不能纯数字，并且Date.parse有正常值
   if (typeof date === 'string' && isNaN(date) && !isNaN(Date.parse(date))) {
      return new Date(date).Format(format);
   } else if (date instanceof Date) {
      return date.Format(format);
   } else {
      // 非法日期参数，则返回空
      return '';
   }
};

export const getDateTime = (date) => {
   return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
};

export const getDate = (date) => {
   return formatDate(date, 'yyyy-MM-dd');
};

export const getDateFormat = (date) => {
   return formatDate(date, 'yyyyMMdd');
};


export const number2date = (dateNum) => {
   let dateStr = dateNum + '';
   return dateStr.substring(0,4) + '-' + dateStr.substring(4,6) + '-' + dateStr.substring(6,8);
};

/**
 * 数字格式化。
 * @param number 数字
 * @param decimals 保留小数位数
 * @returns {string} 标准格式 例：FormatUtil.formatNumber(123456.789, 2) ==> 123,456.79
 */
export const formatNumber = (number, decimals) => {
   decimals = typeof decimals === 'undefined' ? 0 : decimals;
   // 保留指定小数点后位数，并分割数组
   let formatNum = 0;
   if (isNumber(number)) {
      formatNum = number;
   } else  if (typeof number === 'string') {
      formatNum = parseInt(number);
      formatNum = isNaN(parseInt(number)) ? 0 : formatNum;
   } else {
      formatNum = 0;
   }
   let x = formatNum.toFixed(decimals).split('.');
   let x1 = x[0];
   let x2 = x.length > 1 ? '.' + x[1] : '';
   let rgx = /(\d+)(\d{3})/;
   while (rgx.test(x1))
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
   return x1 + x2;
};

/**
 * 货币格式化。
 * @param amount 货币
 * @returns {string} 人民币货币格式  例：FormatUtil.formatCurrency(123456.789) ==> CN¥123,456.79
 */
export const formatCurrency = (amount) => {
   return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'CNY',currencyDisplay: "symbol"}).format(amount);
};

function isNumber(val){
   //非负浮点数
   let regPos = /^\d+(\.\d+)?$/;
   //负浮点数
   let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
   return regPos.test(val) || regNeg.test(val);
}

export const isPhone = (phone) => {
   let phoneReg=/^1[3-9]\d{9}$/;
   return phoneReg.test(phone);
};

/**
 * 在本地进行文件保存
 * @param  {String} data     要保存到本地的文件数据
 * @param  {String} filename 文件名
 */
 export const saveFile = (data, filename) => {
    let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;

    let event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
};

export function mapToObj(strMap){
   let obj= Object.create(null);
   for (let[key,value] of strMap) {
      obj[key] = value;
   }
   return obj;
}

export function objToMap(obj){
   let strMap = new Map();
   for (let k of Object.keys(obj)) {
      strMap.set(k,obj[k]);
   }
   return strMap;
}

function getScrollTop() {
   let scrollTop = 0;
   if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
   } else if (document.body) {
      scrollTop = document.body.scrollTop;
   }
   return scrollTop;
}

export const  getLastYearArray = (n)=>{
   const today = new Date();
   const year = today.getFullYear();
   let yearArray =[];
   for(let i=0;i<n;i++){
      yearArray.push(year-i);
   }
   return yearArray;
}

export const getBirthById = (idNum)=>{
   if(idNum.length === 18){
      return idNum.substring(6,14);
   }else{
      return 0;
   }
    
   
}

export const getGenderById = (idNum)=>{
   if(idNum.length === 18){
      return parseInt(idNum.substr(16, 1)) % 2 ;
   }else{
      return 1;
   }
}
