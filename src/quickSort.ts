export function sort(arr: number[]) {
    // return arr.sort((a, b) => a - b)
    return partion(arr, 0, arr.length - 1);
}


function swap(arr: number[], i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function partion(arr: number[], low: number, high: number): number[] {
      let i: number = low;
      let j: number = high;
      let pivot: number = arr[Math.floor((low + high) / 2)];
  
      while (i <= j) {
  
        while (arr[i] < pivot) {
          i++;
        }
  
        while (arr[j] > pivot) {
          j--;
        }
  
        if (i <= j) {
          swap(arr, i, j);
          i++;
          j--;
        }
      }
  
      if (low < j) {
        partion(arr,low, j);
      }
      if (i < high) {
        partion(arr,i, high);
      }
      return arr;
}






