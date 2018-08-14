import _ from 'lodash';

// get first word of string 
export async function getFirstword(string) {
    const arr =  await _.words(string);

    return arr[0];
}