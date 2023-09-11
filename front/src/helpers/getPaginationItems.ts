export const getPaginationItems = (currentPage: number, lastPage: number, maxLength: number): number[] => {
    
    const result: number[] = [];

    if (lastPage <= maxLength) {
        for (let i = 1; i <= lastPage; i++) {
            result.push(i);
        }
    } else {
        const firstPage = 1;
        const confirmedPagesCount = 3;
        const deductedMaxLength = maxLength - confirmedPagesCount;
        const sideLength = deductedMaxLength / 2;

        if (currentPage - 1 <= sideLength || lastPage - currentPage <= sideLength) {
            for (let j = 1; j <= sideLength + firstPage; j++) {
                result.push(j);
            }
      
            result.push(NaN);
            for (let k = lastPage - sideLength; k <= lastPage; k++) {
                result.push(k);
            }
        } else if (currentPage - firstPage >= deductedMaxLength &&
            lastPage - currentPage >= deductedMaxLength) {
            
            const deductedSideLength = sideLength - 1;
      
            result.push(1);
            result.push(NaN);
      
            for (let l = currentPage - deductedSideLength; l <= currentPage + deductedSideLength; l++) {
                result.push(l);
            }
      
            result.push(NaN);
            result.push(lastPage);

        } else {
            const isNearFirstPage = currentPage - firstPage < lastPage - currentPage;
            let remainingLength = maxLength;
      
            if (isNearFirstPage) {
                for (let m = 1; m <= currentPage + 1; m++) {
                    result.push(m);
                    remainingLength -= 1;
                }
      
                result.push(NaN);
                remainingLength -= 1;
                
                for (let n = lastPage - (remainingLength - 1); n <= lastPage; n++) {
                    result.push(n);
                }
            } else {
                for (let o = lastPage; o >= currentPage - 1; o--) {
                    result.unshift(o);
                    remainingLength -= 1;
                }
      
                result.unshift(NaN);
                remainingLength -= 1;

                for (let p = remainingLength; p >= 1; p--) {
                    result.unshift(p);
                }
            }
        }
    }        
    return result;
};