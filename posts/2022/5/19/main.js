const level1 = document.querySelector('.level1')
const level2 = document.querySelector('.level2')
const level3 = document.querySelector('.level3')
const level4 = document.querySelector('.level4')
const level5 = document.querySelector('.level5')
const level6 = document.querySelector('.level6')
const level7 = document.querySelector('.level7')

let n = 1   //时间变量


level1.addEventListener('click', (e)=>{ //e是事件信息，是浏览器提供的，它会把e自动传给函数，不需要传统意义上的传参
    const t = e.currentTarget //e.currentTarget是被监听的元素
    const t1 = e.target  //e.target是被操作的元素，这里是被点击的元素
    console.log(t===t1)//因为在这个实例里他们都是同一个div，所以为true
    console.log(t)
    console.log(e)

  setTimeout(()=>{  
    t.classList.remove('x')  //移除x，显示颜色
  },n*1000)   //一秒后执行
  n+=1  //每执行完一个函数，加一秒
 })
level2.addEventListener('click', (e)=>{
  const t = e.currentTarget
  setTimeout(()=>{  
    t.classList.remove('x')
  },n*1000)
  n+=1
})
level3.addEventListener('click', (e)=>{
  const t = e.currentTarget
  setTimeout(()=>{  
    t.classList.remove('x')
  },n*1000)
  n+=1
})
level4.addEventListener('click', (e)=>{
  const t = e.currentTarget
  setTimeout(()=>{  
    t.classList.remove('x')
  },n*1000)
  n+=1
})
level5.addEventListener('click', (e)=>{
  const t = e.currentTarget
  setTimeout(()=>{  
    t.classList.remove('x')
  },n*1000)
  n+=1
})
level6.addEventListener('click', (e)=>{
  const t = e.currentTarget
  setTimeout(()=>{  
    t.classList.remove('x')
  },n*1000)
  n+=1
})

level7.addEventListener('click', (e)=>{
    const t = e.currentTarget  
  setTimeout(()=>{  
    t.classList.remove('x')
  },n*1000)
  n+=1
})