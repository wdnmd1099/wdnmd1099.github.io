let test1 = 0;
let con = 'xxxx';
$('.btn').on('click', () => {
    let a1 = 0.01*parseFloat($('.txt1').val());
    let b1 = parseInt($('.txt2').val());
    let c1 = parseInt($('.txt3').val());

    console.log(a1,b1,c1)
        $('.JG').remove();
        test1 = (a1*b1)+b1
        console.log(1+'月总资产'+test1+ ',当月利润：'+a1*b1)

        $('.last').before(`<div class="JG" 
        style="width: 500px;height:30px;">
        ${1+'月总资产:  '}${parseInt(test1)}${ '    ,当月利润：'+ parseInt(a1*b1)}
        </div>`)

        for(let i=1;i<c1;i++){
          test1 = a1 * test1 + test1
          console.log(i+1+'月总资产'+parseInt(test1) + ',当月利润：'+ parseInt(a1*test1))
        //  con = i+1+'月总资产'+parseInt(test1) + ',当月利润：'+ parseInt(a1*test1)

        $('.last').before(`<div class="JG" 
        style="width: 500px;height:30px;">
        ${i+1+'月总资产:  '}${parseInt(test1)}${ '    ,当月利润：'+ parseInt(a1*test1)}
        
        
        </div>`)
            
        }
       
        
    })
