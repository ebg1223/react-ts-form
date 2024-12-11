export function combinations(arr) {
    return arr.flatMap((v, i) => arr.slice(i + 1).map((w) => [v, w]));
}
//# sourceMappingURL=combinations.js.map