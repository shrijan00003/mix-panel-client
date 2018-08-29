import _ from 'lodash';

// get first word of string 
export async function getFirstWord(string) {
    const arr =  await _.words(string);

    return arr[0];
}

export async function getLastWord( string ) {
    const arr = await _.words( string );
    console.log(arr);
    const last = arr.length > 1 ?  _.last(arr) : '';
    return last;
}