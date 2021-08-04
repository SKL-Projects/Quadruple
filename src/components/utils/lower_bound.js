let array, target;

export const binarySearch = (arrayInput, targetInput) => {
   array = arrayInput;
   target = targetInput;
   return binarySearchIndex();
};

function binarySearchIndex(low = 0, high = array.length - 1) {
   if (low > high) {
      return high;
   }
   const midPoint = Math.floor((low + high) / 2);

   if (target < array[midPoint].time.getTime()) {
      return binarySearchIndex(low, midPoint - 1);
   } else if (target > array[midPoint].time.getTime()) {
      return binarySearchIndex(midPoint + 1, high);
   } else {
      return midPoint;
   }
}
