export function significantBTNodeID(id: string): string {
    return id.slice(-4)
}

export function significantBTNodeIDs(arr: string[]): string[] {
    const retArr = []
    for (let id of arr) {
        retArr.push(significantBTNodeID(id))
    }
    return retArr
}
