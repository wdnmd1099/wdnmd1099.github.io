console.log("main.js启动")

$(".baiDuSearch").click(function () {
        $(".searchForm").attr('action', 'https://www.baidu.com/s');    //jQuery的attr方法可以覆盖一个属性
        //这里是把form标签的action属性修改为https://www.baidu.com/s
        $(".searchInput").attr('name', 'wd');    //通过jquery为name属性赋值
        $(".searchForm").submit();    //提交class为searchForm的表单
    })

$(".googleSearch").click(function () {
        $(".searchForm").attr('action', 'https://www.google.com.hk/search');    //通过jquery为action属性赋值
        $(".searchInput").attr('name', 'q');    //通过jquery为name属性赋值
        $(".searchForm").submit();    //提交class为searchForm的表单   jquery的submit()  ->  https://www.runoob.com/jquery/event-submit.html
    })   //方法参考来自: https://blog.csdn.net/BestEternity/article/details/107865959



    const simplifyUrl = (url) => { //删除网址的前缀，只显示域名部分
        return url.replace('https://', '')
          .replace('http://', '')
          .replace('www.', '')
          .replace(/\/.*/, '') // 删除 / 开头的内容
      }










    const $siteList = $('.siteList')
    const $lastLi = $siteList.find('.last')
    let url = ''

    const z = localStorage.getItem('z')
    const zObject =  JSON.parse(z)
    const hashMap = zObject  || [
      {"logo":"C","url":"https://www.cnblogs.com/deerchao/archive/2006/08/24/zhengzhe30fengzhongjiaocheng.html"},
      {"logo":"J","url":"https://www.jquery123.com/"}
    ]

const render = () =>{
    $siteList.find('li:not(.last)').remove();  //删除siteList里的所有li元素，除了class 为last的li元素（添加网页）
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
        
        <div class="site">
        <div class="logo">${(node.logo[0])}</div>
        <div class="link">${simplifyUrl(node.url)}</div>

        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>

          </div>
          <div class="text"></div>
        </div>
        
        </li>`).insertBefore($lastLi)
        console.log($li)
        $li.on('click', () => {
            window.open(node.url)
            console.log('111')
          })
     
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
          })
    }) 
}

render()



$('.addButton').on('click', () => {
        let url1 =  window.prompt('请输入想收藏的网址：')
        url = url1
        if(url.indexOf('http')!==0){
            url = 'https://www.' + url
        }
        console.log('添加的网址为'+url)
        hashMap.push({
            logo:simplifyUrl(url)[0].toUpperCase(),
            url:url
        })
        console.log(hashMap)
        render()
    })







window.onbeforeunload = () => { //检测在离开网页时，把字符串存到localStorage的'x'里
    const string = JSON.stringify(hashMap) //JSON.stringify(hashMap) 把hashMap(对象)转成字符串
    localStorage.setItem('z', string)
  }


