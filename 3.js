function triangle(length){
    if(length % 2 === 0){
        console.log('please insert odd number! \n');
        return;
    }
    let cont = '';

    for (let i = 0; i < length; i++){
        for (let j = 0; j < i; j++){
            cont += ' ';
        }
        for(let j = length; j > i; j--){
            if(j % 2 === 0){
                cont += ' ';
            }else{
                if((i === 0 && parseInt(j/2) % 2 === 0) || i === length-1 || ((i !== 0 && i % 2 === 0) && parseInt(j/2) % 2 !== 0)){
                    cont += '#';
                }else{
                    cont += '+';
                }
            }
        }
        for(let j = length -1; j > i; j--){
            if((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)){
                cont += ' ';
            }else{
                if(i === 0 && parseInt(j/2) % 2 === 0){
                    cont += '#';
                }else if(i !== 0 && (i % 2 === 0 && (parseInt(i/2) % 2 !== 0 && (parseInt(j/2) % 2 === 0)))){
                    cont += '#';
                }else if(i !== 0 && (i % 2 === 0 && (parseInt(i/2) % 2 === 0 && parseInt(j/2) % 2 !== 0))){
                    cont += '#';
                }
                else{
                    cont += '+';
                }
            }
        }
        cont += '\n';
    }
    console.log(cont);
}

triangle(5);
triangle(6)
triangle(9);
triangle(13);