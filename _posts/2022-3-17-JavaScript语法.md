# 什么是表达式和语句
表达式是可以被求值的代码，而语句是一段可执行代码。

如1+2表达式的值为3


add(1,2)表达式的值为函数的返回值

语句： var a = 1 是一个语句

---------------


# 标识符的规则
第一个字符，可以是Unicode字母或$或_或中文

后面的字符，除了上述的，还可以有数字

-----


# if else 语句
```JavaScript
第一种：简单的if…语句

if (condition){  
  当条件为 true 时执行的代码
  }



第二种：简单的if…else…语句

  if (condition){
    当条件为 true 时执行的代码
}else{
    当条件不为 true 时执行的代码
}




第三种：嵌套式的if…else…语句

if (condition){
    if (condition){
                    当条件为 true 时执行的代码
        } else{
                    当条件不为 true 时执行的代码
                }
}  else（condition）{
                    当条件不为 true 时执行的代码
}



第四种：if…else if…else 语句

if (condition1){
    当条件 1 为 true 时执行的代码
}else if (condition2){
    当条件 2 为 true 时执行的代码
}else{
  当条件 1 和 条件 2 都不为 true 时执行的代码
}
```


# while 语句
```JavaScript
while(condition){
    当条件为true时可循环执行的代码,直至循环到条件不满足（false）为止
}
```

# for 语句
```JavaScript
for(初始化语句;判断式;循环语句;){
    当条件为true时可循环执行的代码,直至循环到条件不满足（false）为止
}
```

# break 和 continue
break ： 终止循环

continue ： 跳出此次循环，但下次还通过判断是否会进入循环


# label
{

foo:1


}

foo是label，里面语句是1
foo是一个标签，标签的内容就是1
